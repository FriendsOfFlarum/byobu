import {extend} from "flarum/extend";
import PermissionGrid from "flarum/components/PermissionGrid";

export default function () {
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('startPrivate', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions'),
            permission: 'startPrivateDiscussion'
        }, 95);
    });
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('editRecipients', {
            icon: 'map-o',
            label: app.translator.trans('flagrow-byobu.admin.permission.edit_recipients'),
            permission: 'editRecipients'
        }, 95);
    });
}
