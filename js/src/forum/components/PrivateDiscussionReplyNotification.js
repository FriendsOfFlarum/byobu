import Notification from 'flarum/components/Notification';

export default class PrivateDiscussionReplyNotification extends Notification {
  icon() {
    return 'fas fa-reply';
  }

  href() {
    const notification = this.props.notification;
    const discussion = notification.subject();
    const content = notification.content() || {};

    return app.route.discussion(discussion, content.postNumber);
  }

  content() {
    const user = this.props.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_reply_text', {
      user: user,
    });
  }
}
