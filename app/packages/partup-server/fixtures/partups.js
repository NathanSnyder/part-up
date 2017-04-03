Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        if (!Partups.find().count()) {
            /* 1 */
            Partups.insert({
                '_id' : 'gJngF65ZWyS9f3NDE',
                'name' : 'Crowd funding Part-up organiseren',
                'description' : 'Crowd funding campagne lanceren voor marketing en financiering app development.',
                'type' : Partups.TYPE.COMMERCIAL,
                'type_commercial_budget' : 1000,
                'end_date' : new Date('2016-11-30T00:00:00.000Z'),
                'image' : 'FTHbg6wbPxjiA4Y8w',
                'tags' : [
                    'crowdfunding',
                    'marketing',
                    'part-up',
                    'geld'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'privacy_type' : 1,
                'uppers' : [
                    'K5c5M4Pbdg3B82wQH',
                    'K5c5M4Pbdg3B82wQI'
                ],
                'creator_id' : 'K5c5M4Pbdg3B82wQH',
                'created_at' : new Date('2015-07-21T14:03:19.964Z'),
                'slug' : 'crowd-funding-part-up-organiseren-gJngF65ZWyS9f3NDE',
                'activity_count' : 2,
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                },
                'supporters' : [
                    'a7qcp5RHnh5rfaeW9'
                ],
                'language' : 'nl',
                'upper_data' : [
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQH',
                        'new_updates' : []
                    },
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQI',
                        'new_updates' : []
                    },
                    {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'new_updates' : []
                    }
                ]
            });

            /* 2 */
            Partups.insert({
                '_id' : 'CJETReuE6uo2eF7eW',
                'name' : 'Super secret closed ING partup',
                'description' : 'secret stuff',
                'type' : Partups.TYPE.CHARITY,
                'end_date' : new Date('2017-03-31T00:00:00.000Z'),
                'image' : 'D3zGxajTjWCLhXokS',
                'tags' : [
                    'ing',
                    'financial'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'network_id' : 'wfCv4ZdPe5WNT4xfg',
                'privacy_type' : 5,
                'uppers' : [
                    'K5c5M4Pbdg3B82wQI'
                ],
                'creator_id' : 'K5c5M4Pbdg3B82wQI',
                'created_at' : new Date('2015-07-22T09:26:51.361Z'),
                'slug' : 'super-secret-closed-ing-partup-CJETReuE6uo2eF7eW',
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                },
                'language' : 'en',
                'upper_data' : [
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQI',
                        'new_updates' : []
                    }
                ]
            });

            /* 3 */
            Partups.insert({
                '_id' : 'ASfRYBAzo2ayYk5si',
                'name' : 'A semisecret ING partup, plus ones are ok',
                'description' : 'semi secret organized stuff',
                'type' : Partups.TYPE.ENTERPRISING,
                'end_date' : new Date('2017-01-31T00:00:00.000Z'),
                'image' : 'ComeF2exAjeKBPAf8',
                'tags' : [
                    'ing',
                    'organizational'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'network_id' : 'kRCjWDBkKru3KfsjW',
                'privacy_type' : 4,
                'uppers' : [
                    'K5c5M4Pbdg3B82wQH'
                ],
                'creator_id' : 'K5c5M4Pbdg3B82wQH',
                'created_at' : new Date('2015-07-22T09:38:22.609Z'),
                'slug' : 'a-semisecret-ing-partup-plus-ones-are-ok-ASfRYBAzo2ayYk5si',
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                },
                'language' : 'en',
                'upper_data' : [
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQH',
                        'new_updates' : []
                    }
                ]
            });

            /* 4 */
            Partups.insert({
                '_id' : 'vGaxNojSerdizDPjb',
                'name' : 'Organise a Meteor Meetup',
                'description' : 'organise a meetup at lifely',
                'type' : Partups.TYPE.CHARITY,
                'end_date' : new Date('2017-01-31T00:00:00.000Z'),
                'image' : 'J2KxajXMcqiKwrEBu',
                'tags' : [
                    'lifely',
                    'meetup',
                    'meteor'
                ],
                'location' : {
                    'city' : 'Utrecht',
                    'lat' : 52.0907373999999876,
                    'lng' : 5.1214200999999999,
                    'place_id' : 'ChIJNy3TOUNvxkcR6UqvGUz8yNY',
                    'country' : 'Netherlands'
                },
                'network_id' : 'ibn27M3ePaXhmKzWq',
                'privacy_type' : 3,
                'uppers' : [
                    'a7qcp5RHnh5rfaeW9'
                ],
                'creator_id' : 'a7qcp5RHnh5rfaeW9',
                'created_at' : new Date('2015-07-22T09:42:13.878Z'),
                'slug' : 'organise-a-meteor-meetup-vGaxNojSerdizDPjb',
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                },
                'language' : 'en',
                'upper_data' : [
                    {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'new_updates' : []
                    }
                ]
            });

            /* 5 */
            Partups.insert({
                '_id' : 'WxrpPuJkhafJB3gfF',
                'name' : 'Partup Premium Part-up',
                'description' : 'private',
                'type' : Partups.TYPE.ORGANIZATION,
                'type_organization_budget' : 130,
                'end_date' : new Date('2017-05-31T00:00:00.000Z'),
                'image' : 'xfYreAouRFh4mnctk',
                'tags' : [
                    'private'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'privacy_type' : 2,
                'uppers' : [
                    'K5c5M4Pbdg3B82wQH'
                ],
                'creator_id' : 'K5c5M4Pbdg3B82wQH',
                'created_at' : new Date('2015-07-28T15:26:34.086Z'),
                'slug' : 'partup-premium-part-up-WxrpPuJkhafJB3gfF',
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                },
                'language' : 'en',
                'upper_data' : [
                    {
                        '_id' : 'K5c5M4Pbdg3B82wQH',
                        'new_updates' : []
                    }
                ]
            });

            /* 6-36 */
            /*
            for (var i = 0; i < 30; i++) {
               var descriptions = [
                   'This describes just how great this Part-up is, so please join and let\'s make it the best part-up on the web.',
                   'This describes just how great this Part-up is.',
                   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima error veritatis ratione dolor perferendis inventore optio. Error omnis nostrum expedita.',
                   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum repudiandae exercitationem unde sunt voluptatum consequatur at ipsum incidunt praesentium. Lorem ipsum dolor sit amet.'
               ];

               Partups.insert({
                   name: Fake.fromArray([Fake.sentence(2), Fake.sentence(3), Fake.sentence(4), Fake.sentence(5)]).replace('.', ''),
                   description: Fake.paragraph(Fake.fromArray([1, 2, 3, 4])),
                   creator_id: 'K5c5M4Pbdg3B82wQH',
                   tags: Fake.fromArray([[Fake.word()], [Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word(), Fake.word()]]),
                   uppers: ['K5c5M4Pbdg3B82wQH', 'K5c5M4Pbdg3B82wQI'],
                   location: undefined,
                   privacy_type: Partups.privacy_types.PUBLIC,
                   image: 'FTHbg6wbPxjiA4Y8w',
                   created_at : new Date('2015-03-26T16:25:07.816Z'),
                   end_date: new Date('2015-06-01T10:00:07.100Z'),
               });
            }
            */
        }
    }
});
