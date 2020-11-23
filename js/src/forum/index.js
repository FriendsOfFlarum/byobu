import events from './events';
import extend from './extend';
import pages from './pages';
import notifications from './notifications';

app.initializers.add('fof-byobu', function (app) {
    events(app);
    extend(app);

    pages(app);
    notifications(app);

    //
    // // Add notification preferences.
    // extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
    //     items.add('byobuPrivateDiscussionCreated', {
    //         name: 'byobuPrivateDiscussionCreated',
    //         icon: 'fas fa-map',
    //         label: app.translator.trans('fof-byobu.forum.notifications.pd_label'),
    //     });
    //     items.add('byobuPrivateDiscussionReplied', {
    //         name: 'byobuPrivateDiscussionReplied',
    //         icon: 'fas fa-map',
    //         label: app.translator.trans('fof-byobu.forum.notifications.pd_reply_label'),
    //     });
    //     items.add('byobuPrivateDiscussionAdded', {
    //         name: 'byobuPrivateDiscussionAdded',
    //         icon: 'fas fa-map',
    //         label: app.translator.trans('fof-byobu.forum.notifications.pd_added_label'),
    //     });
    //     items.add('byobuRecipientRemoved', {
    //         name: 'byobuRecipientRemoved',
    //         icon: 'fas fa-map',
    //         label: app.translator.trans('fof-byobu.forum.notifications.pd_user_left_label'),
    //     });
    // });
});
