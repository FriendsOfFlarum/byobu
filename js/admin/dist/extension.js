"use strict";

System.register("flagrow/messaging/main", ["flarum/extend", "flarum/app", "flarum/components/PermissionGrid"], function (_export, _context) {
    "use strict";

    var extend, app, PermissionGrid;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-messaging', function (app) {
                // add the permission option to the relative pane
                extend(PermissionGrid.prototype, 'startItems', function (items) {
                    items.add('messaging', {
                        icon: 'comments-o',
                        label: app.translator.trans('flagrow-messaging.admin.permissions.messaging_label'),
                        permission: 'flagrow.message'
                    });
                });
            });
        }
    };
});