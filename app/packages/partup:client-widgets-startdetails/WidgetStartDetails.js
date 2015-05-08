/*************************************************************/
/* Widget image system */
/*************************************************************/
var ImageSystem = function ImageSystemConstructor () {
    var self = this;

    this.currentImageId = new ReactiveVar(false);
    this.uploaded = new ReactiveVar(false);
    this.availableSuggestions = new ReactiveVar([]);

    this.getSuggestions = function (tags) {
        var newSuggestionsArray = [];
        self.currentImageId.set(false);
        self.uploaded.set(false);

        var addResults = function (result, isFinal) {
            newSuggestionsArray = newSuggestionsArray.concat(lodash.map(result, 'imageUrl'));

            if(isFinal) {
                self.availableSuggestions.set(newSuggestionsArray.slice(0, 5));
                Session.set('partials.start-partup.current-suggestion', 0);
            }
        };

        Meteor.call('partups.services.splashbase.search', tags, function(error, result) {
            if (!error && result.length >= 5) {
                addResults(result, true);
            } else {
                addResults(result);
                Meteor.call('partups.services.flickr.search', tags, function(error, result) {
                    if(!error) addResults(result, true);
                });
            }
        });
    };

    this.unsetUploadedPicture = function (tags) {
        self.getSuggestions(tags);
    };

    // Set suggestion
    var setSuggestionByIndex = function (index, callback) {
        console.log('trying to set suggestion', index);

        var suggestions = self.availableSuggestions.get();
        if(!mout.lang.isArray(suggestions)) return;

        var url = suggestions[index];
        if(!mout.lang.isString(url)) return;

        console.log('passed validation, attaching url', url);
        var newFile = new FS.File();
        newFile.attachData(url, function (error) {

            console.log('attached url');
            var dummyLink = document.createElement('a');
            dummyLink.href = url;
            var pathnameParts = dummyLink.pathname.split('/');
            var filename = pathnameParts[pathnameParts.length - 1];
            newFile.name(filename);
            console.log('attached filename', filename);

            Images.insert(newFile, function (error, image) {
                console.log('inserted image', image);
                callback(image._id)
            });
        });
    };

    Meteor.autorun(function() {
        var suggestionIndex = Session.get('partials.start-partup.current-suggestion');

        if(mout.lang.isNumber(suggestionIndex) && !mout.lang.isNaN(suggestionIndex) && !self.uploaded.get()) {
            self.currentImageId.set(false);
            self.uploaded.set(false);
            setSuggestionByIndex(suggestionIndex, function (imageId) {
                Meteor.subscribe('images.one', imageId);
                self.currentImageId.set(imageId);
                console.log('callback')
            });
        }
    });
};

/*************************************************************/
/* Widget on created */
/*************************************************************/
Template.WidgetStartDetails.onCreated(function() {

    this.nameCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.name.max);
    this.descriptionCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.description.max);
    this.imageSystem = new ImageSystem();

    // When current-partup is known
    var partup = Partups.findOne({ _id: Session.get('partials.start-partup.current-partup') });
    if(partup) {
        if(partup.image) {
            this.imageSystem.currentImageId.set(partup.image);
            this.imageSystem.uploaded.set(true);
        } else {
            this.imageSystem.getSuggestions(partup.tags);
        }
    }

    this.currentPartup = new ReactiveVar(partup || {});
});

/*************************************************************/
/* Widget on rendered */
/*************************************************************/
Template.WidgetStartDetails.onRendered(function() {
    Partup.ui.datepicker.applyToInput(this, '.pu-datepicker');
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartDetails.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    currentPartup: function () {
        return Template.instance().currentPartup.get();
    },
    fieldsFromPartup: function() {
        var partup = Template.instance().currentPartup.get();
        return partup ? Partup.transformers.partup.toFormStartPartup(partup) : {};
    },
    nameCharactersLeft: function(){
        return Template.instance().nameCharactersLeft.get();
    },
    descriptionCharactersLeft: function(){
        return Template.instance().descriptionCharactersLeft.get();
    },
    partupImage: function () {
        return Template.instance().imageSystem;
    },
    suggestionSetter: function () {
        return function (index) {
            Session.set('partials.start-partup.current-suggestion', index);
        }
    },
    currentSuggestion: function () {
        return Session.get('partials.start-partup.current-suggestion');
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartDetails.events({
    'keyup [data-max]': function updateMax(event, template) {
        var max = eval($(event.target).data("max"));
        var charactersLeftVar = $(event.target).data("characters-left-var");
        template[charactersLeftVar].set(max - $(event.target).val().length);
    },
    'change [data-imageupload]': function eventChangeFile(event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                Meteor.subscribe('images.one', image._id);
                template.imageSystem.currentImageId.set(image._id);
                template.imageSystem.uploaded.set(true);
            });
        });
    },
    'click [data-imageremove]': function eventChangeFile(event, template) {
        var tags = Partup.ui.strings.tagsStringToArray($(event.currentTarget.form).find('[name=tags_input]').val());
        template.imageSystem.unsetUploadedPicture(tags);
    },
    'blur [name=tags_input]': function searchFlickerByTags(event, template) {
        var tags = Partup.ui.strings.tagsStringToArray($(event.currentTarget).val());
        Template.instance().imageSystem.getSuggestions(tags);
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    partupForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var partupId = Session.get('partials.start-partup.current-partup');

            if(partupId) {

                // Partup already exists. Update.
                Meteor.call('partups.update', partupId, insertDoc, function(error, res){
                    if(error && error.message) {
                        switch (error.message) {
                            // case 'User not found [403]':
                            //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            //     break;
                            default:
                                Partup.ui.notify.error(error.reason);
                        }
                        AutoForm.validateForm(self.formId);
                        self.done(new Error(error.message));
                        return;
                    }
                    
                    Router.go('start-activities', {_id:partupId});
                });

            } else {

                // Partup does not exists yet. Insert.
                Meteor.call('partups.insert', insertDoc, function(error, res){
                    if(error && error.message) {
                        switch (error.message) {
                            // case 'User not found [403]':
                            //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            //     break;
                            default:
                                Partup.ui.notify.error(error.reason);
                        }
                        AutoForm.validateForm(self.formId);
                        self.done(new Error(error.message));
                        return;
                    }

                    Session.set('partials.start-partup.current-partup', res._id);
                    Router.go('start-activities', {_id:res._id});
                });

            }

            return false;
        }
    }
});
