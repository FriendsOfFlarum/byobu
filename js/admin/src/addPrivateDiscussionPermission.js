import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function() {
  extend(PermissionGrid.prototype, 'moderateItems', items => {
    items.add('recipients', {
      icon: 'user-secret',
      label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions'),
      permission: 'discussion.private'
    }, 95);
  });
}
