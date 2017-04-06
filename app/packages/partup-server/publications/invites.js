Meteor.publishComposite('invites.for_activity_id', function(activityId) {
    check(activityId, String);

    this.unblock();

    return {
        find: function() {
            return Invites.find({activity_id: activityId});
        },
        children: [
            {find: Meteor.users.findForInvite}
        ]
    };
});
