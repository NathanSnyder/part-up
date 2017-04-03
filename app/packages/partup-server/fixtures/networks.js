Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        if (!Networks.find().count()) {

            /* 1 */
            Networks.insert({
                '_id' : 'nqBnE8nSLasaapXXS',
                'name' : 'ING (public)',
                'privacy_type' : 1,
                'slug' : 'ing-public',
                'image': 'T8pfWebTJmvbBNJ2g',
                'icon': 'f7yzkqh9J9JvxCCqN',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus veniam illo inventore excepturi architecto ut, numquam enim est assumenda ex doloremque quos ratione. Repellendus blanditiis, tempora fugit velit est deleniti.',
                'uppers' : [
                    'q63Kii9wwJX3Q6rHS'
                ],
                'admins' : ['q63Kii9wwJX3Q6rHS'],
                'created_at' : new Date('2015-07-21T15:47:33.225Z'),
                'updated_at' : new Date('2015-07-21T15:47:33.225Z'),
                'language': 'en',
                'stats': {},
                'chat_id': 'fMpNncPh4Qua6NANH'
            });

            /* 2 */
            Networks.insert({
                '_id' : 'kRCjWDBkKru3KfsjW',
                'name' : 'ING (invite)',
                'privacy_type' : 2,
                'slug' : 'ing-invite',
                'image': 'efDuvuTzpqH65P9DF',
                'icon': 'fReGXG4qkNXb4K8wp',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi architecto consequatur unde dolorem fuga laboriosam non alias blanditiis odit vero!',
                'uppers' : [
                    'q63Kii9wwJX3Q6rHS',
                    'K5c5M4Pbdg3B82wQH'
                ],
                'admins' : ['q63Kii9wwJX3Q6rHS'],
                'created_at' : new Date('2015-07-21T15:51:48.825Z'),
                'updated_at' : new Date('2015-07-21T15:51:48.825Z'),
                'invites' : [
                    {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'invited_at' : new Date('2015-07-22T09:11:08.062Z'),
                        'invited_by_id' : 'K5c5M4Pbdg3B82wQH'
                    }
                ],
                'stats': {},
                'chat_id': 'JSGpNRF5R3gjEWcGf'
            });

            /* 3 */
            Networks.insert({
                '_id' : 'wfCv4ZdPe5WNT4xfg',
                'name' : 'ING (closed)',
                'privacy_type' : 3,
                'slug' : 'ing-closed',
                'image': 'PnYAg3EX5dKfEnkdn',
                'icon': '4rymNTA3jFfTRKtFJ',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nesciunt tempora accusamus temporibus ipsam modi.',
                'uppers' : [
                    'q63Kii9wwJX3Q6rHS',
                    'K5c5M4Pbdg3B82wQI'
                ],
                'admins' : ['q63Kii9wwJX3Q6rHS'],
                'created_at' : new Date('2015-07-21T15:51:56.562Z'),
                'updated_at' : new Date('2015-07-21T15:51:56.562Z'),
                'invites' : [
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQI',
                        'invited_at' : new Date('2015-07-22T09:12:46.307Z'),
                        'invited_by_id' : 'q63Kii9wwJX3Q6rHS'
                    },
                    {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'invited_at' : new Date('2015-07-22T09:31:48.358Z'),
                        'invited_by_id' : 'q63Kii9wwJX3Q6rHS'
                    }
                ],
                'pending_uppers' : [
                    'a7qcp5RHnh5rfaeW9'
                ],
                'stats': {},
                'chat_id': '9nTogbMy6Ddjfh6NP'
            });

            /* 4 */
            Networks.insert({
                '_id' : 'ibn27M3ePaXhmKzWq',
                'name' : 'Lifely (open)',
                'privacy_type' : 1,
                'slug' : 'lifely-open',
                'image': 'raaNx9aqA6okiqaS4',
                'icon': 'SEswZsYiTTKTTdnN5',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, delectus.',
                'uppers' : [
                    'q63Kii9wwJX3Q6rHS',
                    'K5c5M4Pbdg3B82wQH',
                    'a7qcp5RHnh5rfaeW9'
                ],
                'admins' : ['q63Kii9wwJX3Q6rHS'],
                'created_at' : new Date('2015-07-21T15:52:04.548Z'),
                'updated_at' : new Date('2015-07-21T15:52:04.548Z'),
                'language': 'nl',
                'stats': {},
                'chat_id': 'wioZDD9bTkT2eDF4c'
            });
        }
    }
});
