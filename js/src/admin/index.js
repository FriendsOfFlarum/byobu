import User from 'flarum/core/models/User';

import { extend } from 'flarum/extend';
import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';
import addSettingsModal from "./addSettingsModal";
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('fof-byobu', app => {
  app.store.models.recipients = User;

  addPrivateDiscussionPermission();
  addSettingsModal();

  extend(PermissionGrid.prototype, 'moderateItems', items => {
    items.add('view-flagged-pds', {
      icon: 'fas fa-flag',
      label: app.translator.trans('fof-byobu.admin.permission.view_flagged_pds'),
      permission: 'user.canViewFlaggedPds'
    }, 1);
  });
});
