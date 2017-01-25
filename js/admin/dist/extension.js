"use strict";

System.register("flagrow/byobu/addPrivateDiscussionPermission", ["flarum/extend", "flarum/components/PermissionGrid"], function (_export, _context) {
    "use strict";

    var extend, PermissionGrid;

    _export("default", function () {
        extend(PermissionGrid.prototype, 'startItems', function (items) {
            items.add('startPrivate', {
                icon: 'map-o',
                label: app.translator.trans('flagrow-byobu.admin.permission.create_private_discussions'),
                permission: 'startPrivateDiscussion'
            }, 95);
        });
        extend(PermissionGrid.prototype, 'moderateItems', function (items) {
            items.add('editRecipients', {
                icon: 'map-o',
                label: app.translator.trans('flagrow-byobu.admin.permission.edit_recipients'),
                permission: 'editRecipients'
            }, 95);
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/byobu/helpers/recipientLabel', ['flarum/utils/extract', 'flarum/helpers/username'], function (_export, _context) {
  "use strict";

  var extract, username;
  function recipientLabel(user) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    attrs.style = attrs.style || {};
    attrs.className = 'RecipientLabel ' + (attrs.className || '');

    var link = extract(attrs, 'link');

    if (user) {

      if (link) {
        attrs.title = user.username() || '';
        attrs.href = app.route.user(user);
        attrs.config = m.route;
      }
    } else {
      attrs.className += ' none';
    }

    return m(link ? 'a' : 'span', attrs, m(
      'span',
      { className: 'RecipientLabel-text' },
      user ? username(user) : app.translator.trans('flagrow-byobu.forum.labels.lib.user_deleted')
    ));
  }

  _export('default', recipientLabel);

  return {
    setters: [function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flagrow/byobu/helpers/recipientsLabel', ['flarum/utils/extract', 'flagrow/byobu/helpers/recipientLabel'], function (_export, _context) {
  "use strict";

  var extract, recipientLabel;
  function recipientsLabel(recipients) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var children = [];
    var link = extract(attrs, 'link');

    attrs.className = 'RecipientsLabel ' + (attrs.className || '');

    if (recipients) {
      recipients.forEach(function (recipient) {
        children.push(recipientLabel(recipient, { link: link }));
      });
    } else {
      children.push(recipientLabel());
    }

    return m(
      'span',
      attrs,
      children
    );
  }

  _export('default', recipientsLabel);

  return {
    setters: [function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }, function (_flagrowByobuHelpersRecipientLabel) {
      recipientLabel = _flagrowByobuHelpersRecipientLabel.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flagrow/byobu/main', ['flarum/core/models/User', 'flagrow/byobu/addPrivateDiscussionPermission'], function (_export, _context) {
  "use strict";

  var User, addPrivateDiscussionPermission;
  return {
    setters: [function (_flarumCoreModelsUser) {
      User = _flarumCoreModelsUser.default;
    }, function (_flagrowByobuAddPrivateDiscussionPermission) {
      addPrivateDiscussionPermission = _flagrowByobuAddPrivateDiscussionPermission.default;
    }],
    execute: function () {

      app.initializers.add('flagrow-byobu', function (app) {
        app.store.models.recipients = User;
        addPrivateDiscussionPermission();
      });
    }
  };
});