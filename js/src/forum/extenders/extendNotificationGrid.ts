import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';

export default function extendNotificationGrid() {
  extend('flarum/forum/components/NotificationGrid', 'notificationTypes', function (items) {
    items.add('byobuPrivateDiscussionCreated', {
      name: 'byobuPrivateDiscussionCreated',
      icon: app.forum.attribute('byobu.icon-badge'),
      label: app.translator.trans('fof-byobu.forum.notifications.pd_label'),
    });
    items.add('byobuPrivateDiscussionReplied', {
      name: 'byobuPrivateDiscussionReplied',
      icon: app.forum.attribute('byobu.icon-badge'),
      label: app.translator.trans('fof-byobu.forum.notifications.pd_reply_label'),
    });
    items.add('byobuPrivateDiscussionAdded', {
      name: 'byobuPrivateDiscussionAdded',
      icon: app.forum.attribute('byobu.icon-badge'),
      label: app.translator.trans('fof-byobu.forum.notifications.pd_added_label'),
    });
    items.add('byobuRecipientRemoved', {
      name: 'byobuRecipientRemoved',
      icon: app.forum.attribute('byobu.icon-badge'),
      label: app.translator.trans('fof-byobu.forum.notifications.pd_user_left_label'),
    });
  });
}
