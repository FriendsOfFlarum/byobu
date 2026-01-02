import Discussion from 'flarum/common/models/Discussion';
import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';

export default class PrivateDiscussionAddedNotification extends Notification {
  icon() {
    return app.forum.attribute('byobu.icon-badge') as string;
  }

  href() {
    const notification = this.attrs.notification;
    const discussion = notification.subject() as Discussion;

    return app.route.discussion(discussion);
  }

  content() {
    const user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_added_text', {
      user: user,
    });
  }

  excerpt() {
    return null;
  }
}
