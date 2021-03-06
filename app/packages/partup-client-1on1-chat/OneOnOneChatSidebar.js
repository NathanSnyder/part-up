Template.OneOnOneChatSidebar.onCreated(function() {
    var template = this;
    template.searchValue = new ReactiveVar(undefined);
    template.searchResults = new ReactiveVar(undefined);
    template.selectedIndex = new ReactiveVar(0);

    var searchUser = function(query) {
        template.searchValue.set(query);
        if (!query.length) return template.searchResults.set(undefined);
        var currentQuery = query;
        Meteor.call('users.autocomplete', query, undefined, undefined, {chatSearch: true}, function(err, users) {
            if (err) return Partup.client.notify.error('something went wrong');

            if (query === currentQuery) {
                template.searchResults.set(users);
                template.selectedIndex.set(0);
            }
        });
    };
    template.throttledSearchUser = _.throttle(searchUser, 500, {trailing: true});
});

Template.OneOnOneChatSidebar.helpers({
    data: function() {
        var template = Template.instance();
        var user = Meteor.user();
        return {
            chats: function() {
                if (!user.chats || !user.chats.length) return [];

                return Chats.find({_id: {$in: user.chats}}, {sort: {updated_at: -1}})
                    .map(function(chat) {
                        chat.upper = Meteor.users
                            .findOne({_id: {$nin: [user._id]}, chats: {$in: [chat._id]}});

                        var message = ChatMessages.findOne({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1});
                        if (message) {
                            chat.message = message;
                        }
                        return chat;
                    });
            },
            searchValue: function() {
                return template.searchValue.get();
            },
            searchResults: function() {
                return template.searchResults.get();
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            activeChat: function() {
                return template.data.config.reactiveActiveChat.get();
            },
            selectedIndex: function() {
                return template.selectedIndex.get();
            },
            started_typing: function(user_id, chat_id) {
                var chat = Chats.findOne(chat_id);
                if (!chat) return false;
                if (!chat.started_typing) return false;
                var typing_user = lodash.find(chat.started_typing, {upper_id: user_id});
                if (!typing_user) return false;
                var started_typing_date = new Date(typing_user.date).getTime();
                var now = new Date().getTime();
                return now - started_typing_date < Partup.client.chat.MAX_TYPING_PAUSE;
            }
        };
    },
    formatted: function(content) {
        return new Partup.client.message(content)
            .sanitize()
            .parseMentions({link: false})
            .emojify()
            .getContent();
    }
});

Template.OneOnOneChatSidebar.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'input [data-search]': function(event, template) {
        template.throttledSearchUser(event.currentTarget.value);
    },
    'keyup [data-search]': function(event, template) {
        var pressedKey = event.which ? event.which : event.keyCode;
        if (pressedKey === 40) {
            // down
            var results = template.searchResults.get();
            var max = results ? results.length - 1 : 0;
            template.selectedIndex.set(template.selectedIndex.curValue < max ? template.selectedIndex.curValue + 1 : max);
        } else if (pressedKey === 38) {
            // up
            template.selectedIndex.set(template.selectedIndex.curValue > 0 ? template.selectedIndex.curValue - 1 : 0);
        } else if (pressedKey === 13) {
            // return
            $('[data-index=' + template.selectedIndex.curValue + ']').trigger('click');
            $('[data-search]').val('');
        }
    },
    'click [data-clear]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        $('[data-search]').val('');
        _.defer(function() {
            template.throttledSearchUser('');
            $('[data-search]').blur();
        });
    },
    'click [data-start]': function(event, template) {
        event.preventDefault();
        $('[data-search]').val('');
        $('[data-search]').blur();
        var userId = $(event.currentTarget).data('start');
        template.data.config.onStartChat(userId);
        template.throttledSearchUser('');
        template.selectedIndex.set(0);
    }
});
