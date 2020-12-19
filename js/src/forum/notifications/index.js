import { extend } from 'flarum/extend';
import NotificationGrid from "flarum/components/NotificationGrid";
import PrivateDiscussionNotification from "./PrivateDiscussionNotification";
import PrivateDiscussionRepliedNotification from "./PrivateDiscussionReplyNotification";
import PrivateDiscussionUserLeftNotification from "./PrivateDiscussionUserLeftNotification";
import PrivateDiscussionAddedNotification from "./PrivateDiscussionAddedNotification";

export default function (app) {
    app.notificationComponents.byobuPrivateDiscussionCreated = PrivateDiscussionNotification;
    app.notificationComponents.byobuPrivateDiscussionReplied = PrivateDiscussionRepliedNotification;
    app.notificationComponents.byobuRecipientRemoved = PrivateDiscussionUserLeftNotification;
    app.notificationComponents.byobuPrivateDiscussionAdded = PrivateDiscussionAddedNotification;

    grid();
}

function grid() {
    // Add notification preferences.
    extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
        items.add('byobuPrivateDiscussionCreated', {
            name: 'byobuPrivateDiscussionCreated',
            icon: app.forum.data.attributes['byobu.icon-badge'],
            label: app.translator.trans('fof-byobu.forum.notifications.pd_label'),
        });
        items.add('byobuPrivateDiscussionReplied', {
            name: 'byobuPrivateDiscussionReplied',
            icon: app.forum.data.attributes['byobu.icon-badge'],
            label: app.translator.trans('fof-byobu.forum.notifications.pd_reply_label'),
        });
        items.add('byobuPrivateDiscussionAdded', {
            name: 'byobuPrivateDiscussionAdded',
            icon: app.forum.data.attributes['byobu.icon-badge'],
            label: app.translator.trans('fof-byobu.forum.notifications.pd_added_label'),
        });
        items.add('byobuRecipientRemoved', {
            name: 'byobuRecipientRemoved',
            icon: app.forum.data.attributes['byobu.icon-badge'],
            label: app.translator.trans('fof-byobu.forum.notifications.pd_user_left_label'),
        });
    });
}
