import Notification from 'flarum/components/Notification';

export default class PrivateDiscussionAddedNotification extends Notification {
  icon() {
    return 'fas fa-map';
  }

  href() {
    const notification = this.props.notification;
    const discussion = notification.subject();

    return app.route.discussion(discussion);
  }

  content() {
    const user = this.props.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_added_text', {
      user: user,
    });
  }
}
