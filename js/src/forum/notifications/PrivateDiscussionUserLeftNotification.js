import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';

export default class PrivateDiscussionUserLeftNotification extends Notification {
  icon() {
    return app.forum.attribute('byobu.icon-badge');
  }

  href() {
    const notification = this.attrs.notification;
    const discussion = notification.subject();

    return app.route.discussion(discussion);
  }

  content() {
    const user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_user_left_text', {
      user: user,
    });
  }

  excerpt() {
    return null;
  }
}
