import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function() {
  extend(PermissionGrid.prototype, 'startItems', items => {
    items.add('startPrivate', {
      icon: 'map-o',
      label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions'),
      permission: 'startPrivateDiscussion'
    }, 95);
  });
}
