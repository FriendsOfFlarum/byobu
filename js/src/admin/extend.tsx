import app from 'flarum/admin/app';
import Badge from 'flarum/common/components/Badge';
import Extend from 'flarum/common/extenders';
import Icon from 'flarum/common/components/Icon';
import commonExtend from '../common/extend';

import type Mithril from 'mithril';

const BADGE_ICON_DEFAULT = 'fas fa-map';
const POST_ACTION_ICON_DEFAULT = 'far fa-map';

/**
 * The FontAwesome help link, borrowed from flarum/tags. Only shown when that
 * extension is present, since the translation lives in its locale.
 */
function iconHelpText(): Mithril.Children | null {
  return (
    flarum.extensions['flarum-tags'] &&
    app.translator.trans('flarum-tags.admin.edit_tag.icon_text', {
      a: <a href={app.refs.fontawesome} tabindex="-1" />,
    })
  );
}

export default [
  ...commonExtend,

  new Extend.Admin() //
    .setting(() => ({
      setting: 'fof-byobu.makePublic',
      type: 'boolean',
      label: app.translator.trans('fof-byobu.admin.settings.enable-make-public-option'),
      help: app.translator.trans('fof-byobu.admin.settings.enable-make-public-option-help'),
    }))
    .setting(() => ({
      setting: 'fof-byobu.delete_on_last_recipient_left',
      type: 'boolean',
      label: app.translator.trans('fof-byobu.admin.settings.delete_on_last_recipient_left'),
      help: app.translator.trans('fof-byobu.admin.settings.delete_on_last_recipient_left_help'),
    }))
    .setting(() => ({
      setting: 'fof-byobu.hide_from_all_discussions_page',
      type: 'boolean',
      label: app.translator.trans('fof-byobu.admin.settings.hide_from_all_discussions_page'),
      help: app.translator.trans('fof-byobu.admin.settings.hide_from_all_discussions_page_help'),
    }))
    .setting(() => ({
      setting: 'fof-byobu.icon-badge',
      type: 'string',
      label: app.translator.trans('fof-byobu.admin.settings.badge-icon'),
      help: (
        <div>
          <Badge icon={app.data.settings['fof-byobu.icon-badge'] || BADGE_ICON_DEFAULT} /> {iconHelpText()}
        </div>
      ),
      placeholder: BADGE_ICON_DEFAULT,
    }))
    .setting(() => ({
      setting: 'fof-byobu.icon-postAction',
      type: 'string',
      label: app.translator.trans('fof-byobu.admin.settings.post-event-icon'),
      help: (
        <div>
          <Icon name={app.data.settings['fof-byobu.icon-postAction'] || POST_ACTION_ICON_DEFAULT} /> {iconHelpText()}
        </div>
      ),
      placeholder: POST_ACTION_ICON_DEFAULT,
    }))
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
