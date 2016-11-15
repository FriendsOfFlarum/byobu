import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";

app.initializers.add('flagrow-messaging', app => {
    // add the permission option to the relative pane
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('messaging', {
            icon: 'comments-o',
            label: app.translator.trans('flagrow-messaging.admin.permissions.messaging_label'),
            permission: 'flagrow.message'
        });
    });
});
