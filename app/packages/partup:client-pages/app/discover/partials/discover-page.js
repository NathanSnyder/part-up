/**
 * Content for the Discover-page
 * This template shows the partup-tiles and handles the infinite scroll
 *
 * @param query {ReactiveVar} - The reactive-var for the query options
 */

/**
 * Call part-ups once to set the cache. For cache documentation, please see partup:client-base/client/discover.js
 */
// Meteor.startup(function() {
//     Meteor.call('partups.discover', Partup.client.discover.DEFAULT_QUERY, function(error, ids) {
//         if (error) return;

//         var sliced_ids = ids.slice(0, Partup.client.discover.STARTING_LIMIT);

//         var sub = Meteor.subscribe('partups.by_ids', sliced_ids);

//         Meteor.autorun(function(comp) {
//             if (!sub.ready()) return;
//             comp.stop();

//             // Find the partups
//             var partups = Partups.find({_id: {$in: sliced_ids}}).fetch();

//             // Sort the partups by original given ids
//             partups = lodash.sortBy(partups, function(partup) {
//                 return this.indexOf(partup._id);
//             }, sliced_ids);

//             // Set cache
//             Partup.client.discover.cache.all_partup_ids = ids;
//             Partup.client.discover.cache.set(partups);

//             // Remove data from mini-mongo by stopping the subscription
//             sub.stop();
//         });
//     });
// });

var partupsToColumnTiles = function(partups) {
    return lodash.map(partups, function(partup) {
        return {
            partup: partup
        };
    });
};

/**
 * Discover-page created
 */
Template.app_discover_page.onCreated(function() {
    var tpl = this;

    // The partups datamodel namespace
    tpl.partups = {

        // Constants
        STARTING_LIMIT: Partup.client.discover.STARTING_LIMIT,
        INCREMENT: 24,

        // States
        loading: new ReactiveVar(true),
        infinitescroll_loading: new ReactiveVar(false),
        end_reached: new ReactiveVar(false),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Partups subscription handle
        sub: undefined,

        // Partup ids placeholder
        ids: [],
        getLimitedIds: function(limit) {
            return this.ids.slice(0, limit);
        },

        // Only used to block all new calls (not as loading indicator)
        getting_data: tpl.data.getting_data,

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: tpl.data.query, // Reference to the passed query reactive-var
        onOptionsChange: function(options) {
            if (tpl.partups.getting_data.get() || !options) return;

            tpl.partups.getting_data.set(true);

            // Reset the limit reactive-var and the limit property of options
            tpl.partups.resetLimit();

            // Check if this query is the default query
            var is_default_query = mout.object.equals(options, Partup.client.discover.DEFAULT_QUERY);

            // Get part-ups from cache
            var cached_partups = Partup.client.discover.cache.partups;
            var filled_from_cache = false;
            if (is_default_query && cached_partups.length > 0) {
                filled_from_cache = true;

                tpl.partups.layout.count.set(Partup.client.discover.cache.all_partup_ids.length);
                tpl.partups.layout.items = tpl.partups.layout.clear();

                tpl.partups.loading_rendering = true;
                tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(cached_partups), function() {
                    tpl.partups.loading_rendering = false;
                });
            }

            // Call the partup ids
            tpl.partups.loading.set(!filled_from_cache);
            Meteor.call('partups.discover', options, function(error, ids) {
                if (error || !ids || tpl.view.isDestroyed) return;

                tpl.partups.ids = ids;

                var limitedIds = tpl.partups.getLimitedIds(tpl.partups.STARTING_LIMIT);

                var oldsub = tpl.partups.sub;
                tpl.partups.sub = tpl.subscribe('partups.by_ids', limitedIds);

                tpl.autorun(function(comp) {
                    if (tpl.partups.sub.ready()) {
                        comp.stop();

                        if (oldsub) oldsub.stop();

                        var partups = Partups.find({_id: {$in: limitedIds}}).fetch();

                        partups = lodash.sortBy(partups, function(partup) {
                            return this.indexOf(partup._id);
                        }, limitedIds);

                        if (is_default_query) {
                            Partup.client.discover.cache.all_partup_ids = ids;
                            Partup.client.discover.cache.set(partups);
                        }

                        if (!is_default_query || !filled_from_cache) {
                            tpl.partups.layout.count.set(ids.length);
                            tpl.partups.layout.items = tpl.partups.layout.clear();

                            tpl.partups.loading_rendering = true;
                            tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(partups), function() {
                                tpl.partups.loading_rendering = false;
                            });
                        }

                        tpl.partups.loading.set(false);
                        tpl.partups.getting_data.set(false);
                    }
                });
            });
        },

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            if (tpl.partups.getting_data.get()) return;

            var first = b === tpl.partups.STARTING_LIMIT;
            if (first) return;

            tpl.partups.getting_data.set(true);

            var limitedIds = tpl.partups.getLimitedIds(b);
            tpl.partups.infinitescroll_loading.set(true);

            var oldsub = tpl.partups.sub;
            tpl.partups.sub = tpl.subscribe('partups.by_ids', limitedIds);

            tpl.autorun(function(comp) {
                if (tpl.partups.sub.ready()) {
                    comp.stop();

                    if (oldsub) oldsub.stop();

                    var oldPartups = tpl.partups.layout.items;
                    var newPartups = Partups.find({_id: {$in: limitedIds}}).fetch();

                    var diffPartups = mout.array.filter(newPartups, function(partup) {
                        return !mout.array.find(oldPartups, function(_partup) {
                            return partup._id === _partup._id;
                        });
                    });

                    diffPartups = lodash.sortBy(diffPartups, function(partup) {
                        return this.indexOf(partup._id);
                    }, limitedIds);

                    var end_reached = diffPartups.length === 0;
                    tpl.partups.end_reached.set(end_reached);

                    tpl.partups.loading_rendering = true;
                    tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(diffPartups), function() {
                        tpl.partups.loading_rendering = false;
                    });

                    tpl.partups.getting_data.set(false);
                }
            });
        }),

        // Increase limit function
        increaseLimit: function() {
            tpl.partups.limit.set(tpl.partups.limit.get() + tpl.partups.INCREMENT);
        },

        // Reset limit function
        resetLimit: function() {
            tpl.partups.limit.set(tpl.partups.STARTING_LIMIT);
            tpl.partups.end_reached.set(false);
        }
    };

    // Fire onOptionsChange when the options change
    tpl.autorun(function() {
        var options = tpl.partups.options.get();

        Tracker.nonreactive(function() {
            tpl.partups.onOptionsChange(options);
        });
    });
});

/**
 * Discover-page rendered
 */
Template.app_discover_page.onRendered(function() {
    var tpl = this;

    /**
     * Infinite scroll
     */
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.partups.loading.get() || tpl.partups.getting_data.get() || tpl.partups.loading_rendering || tpl.partups.end_reached.get()) return;
        tpl.partups.increaseLimit();
    });
});

/**
 * Discover-page helpers
 */
Template.app_discover_page.helpers({
    count: function() {
        return Template.instance().partups.layout.count.get() || '';
    },
    showProfileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return false;
        return user.completeness < 100;
    },
    profileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return '...';
        return user.completeness;
    },
    partupsLoading: function() {
        var tpl = Template.instance();
        return tpl.partups.loading.get();
    },

    amountOfColumns: function() {
        var tpl = Template.instance();
        var smaller = Partup.client.screensize.current.get('width') < Partup.client.grid.getWidth(11) + 80;
        Meteor.defer(function() {
            tpl.partups.layout.rerender();
        });
        return smaller ? 3 : 4;
    },

    // We use this trick to be able to call a function in a child template.
    // The child template directly calls 'addToLayoutHook' with a callback.
    // We save that callback, so we can call it later and the child template can react to it.
    addToLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.add = callback;
        };
    },
    clearLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.clear = callback;
        };
    },
    rerenderLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.rerender = callback;
        };
    }
});

Template.app_discover_page.events({
    'click [data-open-profilesettings]': function(event, template) {
        event.preventDefault();

        Intent.go({
            route: 'profile-settings',
            params: {
                _id: Meteor.userId()
            }
        });
    }
});
