import Notification from 'flarum/components/Notification';

export default class PrivateDiscussionAddedNotification extends Notification {
    icon() {
        return app.forum.data.attributes['byobu.icon-badge'];
    }

    href() {
        const notification = this.attrs.notification;
        const discussion = notification.subject();

        return app.route.discussion(discussion);
    }

    content() {
        const user = this.attrs.notification.fromUser();
        return app.translator.trans('fof-byobu.forum.notifications.pd_added_text', {
            user: user,
        });
    }
}
