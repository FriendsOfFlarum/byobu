import {extend} from "flarum/extend";
import PermissionGrid from "flarum/components/PermissionGrid";

export default function () {
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('startPrivateUsers', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_users'),
            permission: 'discussion.startPrivateDiscussionWithUsers'
        }, 95);
        items.add('startPrivateGroups', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_groups'),
            permission: 'discussion.startPrivateDiscussionWithGroups'
        }, 95);
        items.add('startPrivateBlockers', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_blocking_users'),
            permission: 'startPrivateDiscussionWithBlockers'
        }, 95);
    });
    extend(PermissionGrid.prototype, 'replyItems', items => {
        items.add('makePrivatePublic', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.make_private_into_public'),
            permission: 'discussion.makePublic'
        }, 95);
    });
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('editUserRecipients', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.edit_user_recipients'),
            permission: 'discussion.editUserRecipients'
        }, 95);
        items.add('editGroupRecipients', {
            icon: 'far fa-map',
            label: app.translator.trans('fof-byobu.admin.permission.edit_group_recipients'),
            permission: 'discussion.editGroupRecipients'
        }, 95);
        items.add('actor-can-view-private-discussions-when-flagged', {
            icon: 'fas fa-flag',
            label: app.translator.trans('fof-byobu.admin.permission.view_private_discussions-when-flagged'),
            permission: 'user.viewPrivateDiscussionsWhenFlagged'
          }, 95);
    });
}
