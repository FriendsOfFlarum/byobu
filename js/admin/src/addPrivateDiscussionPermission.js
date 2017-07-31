import {extend} from "flarum/extend";
import PermissionGrid from "flarum/components/PermissionGrid";

export default function () {
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('startPrivateUsers', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions_with_users'),
            permission: 'discussion.startPrivateDiscussionWithUsers'
        }, 95);
        items.add('startPrivateGroups', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions_with_groups'),
            permission: 'discussion.startPrivateDiscussionWithGroups'
        }, 95);
    });
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('editUserRecipients', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.edit_user_recipients'),
            permission: 'discussion.editUserRecipients'
        }, 95);
        items.add('editGroupRecipients', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.edit_group_recipients'),
            permission: 'discussion.editGroupRecipients'
        }, 95);
    });
}
