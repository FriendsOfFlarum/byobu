import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
import ByobuSettingsPage from './components/ByobuSettingsPage';
import User from 'flarum/common/models/User';

export default [
  ...commonExtend,

  new Extend.Store().add('recipients', User),

  new Extend.Admin()
    .page(ByobuSettingsPage)
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_users'),
        permission: 'discussion.startPrivateDiscussionWithUsers',
        tagScoped: false,
      }),
      'start',
      95
    )
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.add_more_than_two_user_recipients'),
        permission: 'discussion.addMoreThanTwoUserRecipients',
        tagScoped: false,
      }),
      'start',
      95
    )
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_groups'),
        permission: 'discussion.startPrivateDiscussionWithGroups',
        tagScoped: false,
      }),
      'start',
      95
    )
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_blocking_users'),
        permission: 'discussion.startPrivateDiscussionWithBlockers',
        tagScoped: false,
      }),
      'start',
      95
    )
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.edit_user_recipients'),
        permission: 'discussion.editUserRecipients',
        tagScoped: false,
      }),
      'moderate',
      95
    )
    .permission(
      () => ({
        icon: 'far fa-map',
        label: app.translator.trans('fof-byobu.admin.permission.edit_group_recipients'),
        permission: 'discussion.editGroupRecipients',
        tagScoped: false,
      }),
      'moderate',
      95
    )
    .permission(
      () => ({
        icon: 'fas fa-flag',
        label: app.translator.trans('fof-byobu.admin.permission.view_private_discussions-when-flagged'),
        permission: 'user.viewPrivateDiscussionsWhenFlagged',
        tagScoped: false,
      }),
      'moderate',
      95
    )
    .permission(
      () => {
        if (!app.data.settings['fof-byobu.makePublic']) {
          return null;
        }

        return {
          icon: 'far fa-map',
          label: app.translator.trans('fof-byobu.admin.permission.make_private_into_public'),
          permission: 'discussion.makePublic',
          tagScoped: false,
        };
      },
      'reply',
      95
    ),
];
