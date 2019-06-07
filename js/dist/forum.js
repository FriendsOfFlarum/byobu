module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_common__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/common/helpers/recipientCountLabel.js":
/*!***************************************************!*\
  !*** ./src/common/helpers/recipientCountLabel.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return recipientCountLabel; });
function recipientCountLabel(count, attrs) {
  if (attrs === void 0) {
    attrs = {};
  }

  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');
  var label = app.translator.transChoice('fof-byobu.forum.labels.recipients', count, {
    count: count
  });
  return m('span', attrs, m("span", {
    className: "RecipientLabel-text"
  }, label));
}

/***/ }),

/***/ "./src/common/helpers/recipientLabel.js":
/*!**********************************************!*\
  !*** ./src/common/helpers/recipientLabel.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return recipientLabel; });
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/utils/extract */ "flarum/utils/extract");
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_3__);




function recipientLabel(recipient, attrs) {
  if (attrs === void 0) {
    attrs = {};
  }

  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');
  var link = flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0___default()(attrs, 'link');
  var label;

  if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default.a) {
    label = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_1___default()(recipient);

    if (link) {
      attrs.title = recipient.username() || '';
      attrs.href = app.route.user(recipient);
      attrs.config = m.route;
    }
  } else if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_3___default.a) {
    label = recipient.namePlural();
  } else {
    attrs.className += ' none';
    label = app.translator.trans('fof-byobu.forum.labels.user_deleted');
  }

  return m(link ? 'a' : 'span', attrs, m("span", {
    className: "RecipientLabel-text"
  }, label));
}

/***/ }),

/***/ "./src/common/helpers/recipientsLabel.js":
/*!***********************************************!*\
  !*** ./src/common/helpers/recipientsLabel.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return recipientsLabel; });
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/utils/extract */ "flarum/utils/extract");
/* harmony import */ var flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recipientLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipientLabel */ "./src/common/helpers/recipientLabel.js");


function recipientsLabel(recipients, attrs) {
  if (attrs === void 0) {
    attrs = {};
  }

  var children = [];
  var link = flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0___default()(attrs, 'link');
  attrs.className = 'RecipientsLabel ' + (attrs.className || '');

  if (recipients) {
    recipients.forEach(function (recipient) {
      children.push(Object(_recipientLabel__WEBPACK_IMPORTED_MODULE_1__["default"])(recipient, {
        link: link
      }));
    });
  } else {
    children.push(Object(_recipientLabel__WEBPACK_IMPORTED_MODULE_1__["default"])());
  }

  return m("span", attrs, children);
}

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/forum/addDiscussPrivatelyControl.js":
/*!*************************************************!*\
  !*** ./src/forum/addDiscussPrivatelyControl.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/utils/UserControls */ "flarum/utils/UserControls");
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Add a control allowing the discussion to be moved to another category.
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_1___default.a, 'userControls', function (items, user) {
    if (app.session.user && app.session.user.id() !== user.id() && app.forum.attribute('canStartPrivateDiscussion') && (user.blocksPd() === false || app.forum.attribute('canStartPrivateDiscussionWithBlockers'))) {
      items.add('private-discussion', flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        children: app.translator.trans('fof-byobu.forum.buttons.send_pd', {
          username: user.username()
        }),
        icon: 'far fa-map',
        onclick: function onclick() {
          var deferred = m.deferred();
          var recipients = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a();
          recipients.add('users:' + user.id(), user);
          recipients.add('users:' + app.session.user.id(), app.session.user);
          flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.recipients = recipients;
          var component = new flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_2___default.a({
            user: app.session.user,
            recipients: recipients,
            recipientUsers: recipients
          });
          app.composer.load(component);
          app.composer.show();
          deferred.resolve(component);
          return deferred.promise;
        }
      }));
    }

    return items;
  });
});

/***/ }),

/***/ "./src/forum/addHasRecipientsBadge.js":
/*!********************************************!*\
  !*** ./src/forum/addHasRecipientsBadge.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addHasRecipientsBadge; });
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/models/Discussion */ "flarum/models/Discussion");
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Badge */ "flarum/components/Badge");
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2__);



function addHasRecipientsBadge() {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'badges', function (badges) {
    if (this.recipientUsers().length || this.recipientGroups().length) {
      badges.add('private', flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        type: 'private',
        label: app.translator.trans('fof-byobu.forum.badges.is_private.tooltip'),
        icon: 'fas fa-map'
      }), 10);
    }
  });
}

/***/ }),

/***/ "./src/forum/addPrivacySetting.js":
/*!****************************************!*\
  !*** ./src/forum/addPrivacySetting.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/SettingsPage */ "flarum/components/SettingsPage");
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'privacyItems', function (items) {
    var _this = this;

    items.add('byobu-block-dm', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      children: app.translator.trans('fof-byobu.forum.user.settings.block_pd'),
      state: this.user.preferences().blocksPd,
      onchange: function onchange(value, component) {
        return _this.preferenceSaver('blocksPd')(value, component);
      }
    }));
  });
});

/***/ }),

/***/ "./src/forum/addPrivateDiscussionsPage.js":
/*!************************************************!*\
  !*** ./src/forum/addPrivateDiscussionsPage.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_PrivateDiscussionsUserPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/PrivateDiscussionsUserPage */ "./src/forum/components/PrivateDiscussionsUserPage.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  if (!Number(app.data['fof-byobu.enable_byobu_user_page'])) return;
  app.routes['user.byobu'] = {
    path: '/u/:username/byobu',
    component: _components_PrivateDiscussionsUserPage__WEBPACK_IMPORTED_MODULE_3__["default"].component()
  };
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'navItems', function (items) {
    items.add('byobu', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      href: app.route('user.byobu', {
        username: this.user.username()
      }),
      children: app.translator.trans('fof-byobu.forum.user.byobu_link'),
      icon: 'fas fa-map'
    }), 85);
  });
});

/***/ }),

/***/ "./src/forum/addRecipientComposer.js":
/*!*******************************************!*\
  !*** ./src/forum/addRecipientComposer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/AddRecipientModal */ "./src/forum/components/AddRecipientModal.js");
/* harmony import */ var _common_helpers_recipientCountLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/helpers/recipientCountLabel */ "./src/common/helpers/recipientCountLabel.js");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__);







/* harmony default export */ __webpack_exports__["default"] = (function (app) {
  // Add recipient-selection abilities to the discussion composer.
  flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.recipients = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default.a();
  flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.recipientUsers = [];
  flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.recipientGroups = []; // Add a recipient selection modal when clicking the recipient tag label.

  flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.chooseRecipients = function () {
    var _this = this;

    app.modal.show(new _components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_2__["default"]({
      selectedRecipients: this.recipients,
      onsubmit: function onsubmit(recipients) {
        _this.recipients = recipients; // Focus on recipient autocomplete field.

        _this.$('.RecipientsInput').focus();
      }
    }));
  }; // Add a tag-selection menu to the discussion composer's header, after the
  // title.


  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'headerItems', function (items) {
    if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
      var recipients = this.recipients.toArray();
      items.add('recipients', m("a", {
        className: "DiscussionComposer-changeRecipients",
        onclick: this.chooseRecipients.bind(this)
      }, recipients.length ? Object(_common_helpers_recipientCountLabel__WEBPACK_IMPORTED_MODULE_3__["default"])(recipients.length) : m("span", {
        className: "RecipientLabel none"
      }, app.translator.trans('fof-byobu.forum.buttons.add_recipients'))), 5);
    }
  }); // Add the selected tags as data to submit to the server.

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'data', function (data) {
    var users = [];
    var groups = [];
    this.recipients.toArray().forEach(function (recipient) {
      if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_4___default.a) {
        users.push(recipient);
      }

      if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_5___default.a) {
        groups.push(recipient);
      }
    });
    data.relationships = data.relationships || {};

    if (users.length) {
      data.relationships.recipientUsers = users;
    }

    if (groups.length) {
      data.relationships.recipientGroups = groups;
    }
  });
});

/***/ }),

/***/ "./src/forum/addRecipientLabels.js":
/*!*****************************************!*\
  !*** ./src/forum/addRecipientLabels.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_DiscussionListItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionListItem */ "flarum/components/DiscussionListItem");
/* harmony import */ var flarum_components_DiscussionListItem__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionListItem__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/DiscussionHero */ "flarum/components/DiscussionHero");
/* harmony import */ var flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/DiscussionList */ "flarum/components/DiscussionList");
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/helpers/recipientsLabel */ "./src/common/helpers/recipientsLabel.js");






/* harmony default export */ __webpack_exports__["default"] = (function () {
  var addToDiscussion = function addToDiscussion(discussion, items, _long) {
    var recipients = [];

    if (discussion.recipientUsers().length) {
      recipients = recipients.concat(discussion.recipientUsers());
    }

    if (discussion.recipientGroups().length) {
      recipients = recipients.concat(discussion.recipientGroups());
    }

    if (recipients && recipients.length) {
      if (_long) {
        items.add('recipients', Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_5__["default"])(recipients), 10);
      } else {
        items.add('recipients', Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_5__["default"])(recipients, {
          link: true
        }), 4);
      }
    }
  };
  /**
   * Adds User labels on the discussion index page.
   */


  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionListItem__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'infoItems', function (items) {
    var discussion = this.props.discussion;
    addToDiscussion(discussion, items, true);
  });
  /**
   * Require recipients from the API whenever we're loading a Discussion page.
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'params', function (params) {
    params.include.push('recipientUsers');
    params.include.push('recipientGroups');
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'requestParams', function (params) {
    params.include.push('recipientUsers');
    params.include.push('recipientGroups');
  });
  /**
   * Adds User labels on the discussion Hero.
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'items', function (items) {
    var discussion = this.props.discussion;
    addToDiscussion(discussion, items, false);
  });
});

/***/ }),

/***/ "./src/forum/addRecipientsControl.js":
/*!*******************************************!*\
  !*** ./src/forum/addRecipientsControl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/utils/DiscussionControls */ "flarum/utils/DiscussionControls");
/* harmony import */ var flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AddRecipientModal */ "./src/forum/components/AddRecipientModal.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Add a control allowing the discussion to be moved to another category.
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default.a, 'moderationControls', function (items, discussion) {
    if (discussion.canEditRecipients()) {
      items.add('recipients', flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        children: app.translator.trans('fof-byobu.forum.buttons.edit_recipients'),
        icon: 'far fa-map',
        onclick: function onclick() {
          return app.modal.show(new _components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_3__["default"]({
            discussion: discussion
          }));
        }
      }));
    }
  });
});

/***/ }),

/***/ "./src/forum/components/AddRecipientModal.js":
/*!***************************************************!*\
  !*** ./src/forum/components/AddRecipientModal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddRecipientModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _RecipientSearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RecipientSearch */ "./src/forum/components/RecipientSearch.js");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_7__);









var AddRecipientModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AddRecipientModal, _Modal);

  function AddRecipientModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = AddRecipientModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.selected = m.prop(new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a());

    if (this.props.discussion) {
      // Adds recipients of the currently viewed discussion.
      this.assignInitialRecipients(this.props.discussion);
    } else if (this.props.selectedRecipients.toArray().length > 0) {
      // Adds previously selected recipients.
      this.selected().merge(this.props.selectedRecipients);
    } else {
      // Adds the current user in case there are no selected recipients yet and this is a new discussion.
      this.selected().add("users:" + app.session.user.id(), app.session.user);
    }

    this.recipientSearch = _RecipientSearch__WEBPACK_IMPORTED_MODULE_5__["default"].component({
      selected: this.selected,
      discussion: this.props.discussion
    });
  };

  _proto.assignInitialRecipients = function assignInitialRecipients(discussion) {
    var _this = this;

    discussion.recipientUsers().map(function (user) {
      _this.selected().add("users:" + user.id(), user);
    });
    discussion.recipientGroups().map(function (group) {
      _this.selected().add("groups:" + group.id(), group);
    });
  };

  _proto.className = function className() {
    return 'AddRecipientModal';
  };

  _proto.title = function title() {
    return this.props.discussion ? app.translator.trans('fof-byobu.forum.modal.titles.update_recipients', {
      title: m("em", null, this.props.discussion.title())
    }) : app.translator.trans('fof-byobu.forum.modal.titles.add_recipients');
  };

  _proto.content = function content() {
    return [m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "AddRecipientModal-form"
    }, this.recipientSearch, m("div", {
      className: "AddRecipientModal-form-submit App-primaryControl"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      disabled: false,
      icon: 'fas fa-check',
      children: app.translator.trans('fof-byobu.forum.buttons.submit')
    }))))];
  };

  _proto.select = function select(e) {
    // Ctrl + Enter submits the selection, just Enter completes the current entry
    if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
      if (this.selected().length) {
        this.$('form').submit();
      }
    }
  };

  _proto.onsubmit = function onsubmit(e) {
    e.preventDefault();
    var discussion = this.props.discussion;
    var recipients = this.selected();
    var recipientGroups = [];
    var recipientUsers = [];
    recipients.toArray().forEach(function (recipient) {
      if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_6___default.a) {
        recipientUsers.push(recipient);
      }

      if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_7___default.a) {
        recipientGroups.push(recipient);
      }
    }); // Recipients are updated here for existing discussions here.

    if (discussion) {
      discussion.save({
        relationships: {
          recipientUsers: recipientUsers,
          recipientGroups: recipientGroups
        }
      }).then(function () {
        if (app.current instanceof flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default.a) {
          app.current.stream.update();
        }

        m.redraw();
      });
    } // Use the onsubmit callback to trigger an update in the DiscussionComposer


    if (this.props.onsubmit) this.props.onsubmit(recipients);
    app.modal.close();
    m.redraw.strategy('none');
  };

  return AddRecipientModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/PrivateDiscussionIndex.js":
/*!********************************************************!*\
  !*** ./src/forum/components/PrivateDiscussionIndex.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionIndex; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/helpers/listItems */ "flarum/helpers/listItems");
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PrivateDiscussionList */ "./src/forum/components/PrivateDiscussionList.js");
/* harmony import */ var flarum_components_WelcomeHero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/components/WelcomeHero */ "flarum/components/WelcomeHero");
/* harmony import */ var flarum_components_WelcomeHero__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_components_WelcomeHero__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! flarum/components/SelectDropdown */ "flarum/components/SelectDropdown");
/* harmony import */ var flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_14__);
















var PrivateDiscussionIndex =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionIndex, _Page);

  function PrivateDiscussionIndex() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionIndex.prototype;

  _proto.init = function init() {
    _Page.prototype.init.call(this); // If the user is returning from a discussion page, then take note of which
    // discussion they have just visited. After the view is rendered, we will
    // scroll down so that this discussion is in view.


    if (app.previous instanceof flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_10___default.a) {
      this.lastDiscussion = app.previous.discussion;
    } // If the user is coming from the discussion list, then they have either
    // just switched one of the parameters (filter, sort, search) or they
    // probably want to refresh the results. We will clear the discussion list
    // cache so that results are reloaded.


    if (app.previous instanceof PrivateDiscussionIndex) {
      app.cache.privateDiscussionList = null;
    }

    var params = this.params();

    if (app.cache.privateDiscussionList) {
      // Compare the requested parameters (sort, search query) to the ones that
      // are currently present in the cached discussion list. If they differ, we
      // will clear the cache and set up a new discussion list component with
      // the new parameters.
      Object.keys(params).some(function (key) {
        if (app.cache.privateDiscussionList.props.params[key] !== params[key]) {
          app.cache.privateDiscussionList = null;
          return true;
        }
      });
    }

    if (!app.cache.privateDiscussionList) {
      app.cache.privateDiscussionList = new _PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_6__["default"]({
        params: params
      });
    }

    app.history.push('private-index', flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default()('far fa-map'));
    this.bodyClass = 'App--index';
  };

  _proto.onunload = function onunload() {
    // Save the scroll position so we can restore it when we return to the
    // discussion list.
    app.cache.scrollTop = $(window).scrollTop();
  };

  _proto.view = function view() {
    return m("div", {
      className: "IndexPage"
    }, this.hero(), m("div", {
      className: "container"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.sidebarItems().toArray()))), m("div", {
      className: "IndexPage-results sideNavOffset"
    }, m("div", {
      className: "IndexPage-toolbar"
    }, m("ul", {
      className: "IndexPage-toolbar-view"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.viewItems().toArray())), m("ul", {
      className: "IndexPage-toolbar-action"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.actionItems().toArray()))), app.cache.discussionList.render())));
  };

  _proto.config = function config(isInitialized, context) {
    _Page.prototype.config.apply(this, arguments);

    if (isInitialized) return;
    Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(context, 'onunload', function () {
      return $('#app').css('min-height', '');
    });
    app.setTitle('');
    app.setTitleCount(0); // Work out the difference between the height of this hero and that of the
    // previous hero. Maintain the same scroll position relative to the bottom
    // of the hero so that the sidebar doesn't jump around.

    var oldHeroHeight = app.cache.heroHeight;
    var heroHeight = app.cache.heroHeight = this.$('.Hero').outerHeight();
    var scrollTop = app.cache.scrollTop;
    $('#app').css('min-height', $(window).height() + heroHeight); // Scroll to the remembered position. We do this after a short delay so that
    // it happens after the browser has done its own "back button" scrolling,
    // which isn't right. https://github.com/flarum/core/issues/835

    var scroll = function scroll() {
      return $(window).scrollTop(scrollTop - oldHeroHeight + heroHeight);
    };

    scroll();
    setTimeout(scroll, 1); // If we've just returned from a discussion page, then the constructor will
    // have set the `lastDiscussion` property. If this is the case, we want to
    // scroll down to that discussion so that it's in view.

    if (this.lastDiscussion) {
      var $discussion = this.$(".DiscussionListItem[data-id=\"" + this.lastDiscussion.id() + "\"]");

      if ($discussion.length) {
        var indexTop = $('#header').outerHeight();
        var indexBottom = $(window).height();
        var discussionTop = $discussion.offset().top;
        var discussionBottom = discussionTop + $discussion.outerHeight();

        if (discussionTop < scrollTop + indexTop || discussionBottom > scrollTop + indexBottom) {
          $(window).scrollTop(discussionTop - indexTop);
        }
      }
    }
  }
  /**
   * Get the component to display as the hero.
   *
   * @return {MithrilComponent}
   */
  ;

  _proto.hero = function hero() {
    return flarum_components_WelcomeHero__WEBPACK_IMPORTED_MODULE_7___default.a.component();
  }
  /**
   * Build an item list for the sidebar of the index page. By default this is a
   * "New Discussion" button, and then a DropdownSelect component containing a
   * list of navigation items.
   *
   * @return {ItemList}
   */
  ;

  _proto.sidebarItems = function sidebarItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;
    items.add('newDiscussion', flarum_components_Button__WEBPACK_IMPORTED_MODULE_12___default.a.component({
      children: app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'),
      icon: 'fas fa-edit',
      className: 'Button Button--primary IndexPage-newDiscussion',
      itemClassName: 'App-primaryControl',
      onclick: this.newDiscussion.bind(this),
      disabled: !canStartDiscussion
    }));
    items.add('nav', flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_14___default.a.component({
      children: this.navItems(this).toArray(),
      buttonClassName: 'Button',
      className: 'App-titleControl'
    }));
    return items;
  }
  /**
   * Build an item list for the navigation in the sidebar of the index page. By
   * default this is just the 'All Discussions' link.
   *
   * @return {ItemList}
   */
  ;

  _proto.navItems = function navItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var params = this.stickyParams();
    items.add('allDiscussions', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_13___default.a.component({
      href: app.route('index', params),
      children: app.translator.trans('core.forum.index.all_discussions_link'),
      icon: 'far fa-comments'
    }), 100);
    return items;
  }
  /**
   * Build an item list for the part of the toolbar which is concerned with how
   * the results are displayed. By default this is just a select box to change
   * the way discussions are sorted.
   *
   * @return {ItemList}
   */
  ;

  _proto.viewItems = function viewItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var sortMap = app.cache.discussionList.sortMap();
    var sortOptions = {};

    for (var i in sortMap) {
      sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
    }

    items.add('sort', flarum_components_Select__WEBPACK_IMPORTED_MODULE_11___default.a.component({
      options: sortOptions,
      value: this.params().sort || Object.keys(sortMap)[0],
      onchange: this.changeSort.bind(this)
    }));
    return items;
  }
  /**
   * Build an item list for the part of the toolbar which is about taking action
   * on the results. By default this is just a "mark all as read" button.
   *
   * @return {ItemList}
   */
  ;

  _proto.actionItems = function actionItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    items.add('refresh', flarum_components_Button__WEBPACK_IMPORTED_MODULE_12___default.a.component({
      title: app.translator.trans('core.forum.index.refresh_tooltip'),
      icon: 'fas fa-refresh',
      className: 'Button Button--icon',
      onclick: function onclick() {
        return app.cache.discussionList.refresh();
      }
    }));

    if (app.session.user) {
      items.add('markAllAsRead', flarum_components_Button__WEBPACK_IMPORTED_MODULE_12___default.a.component({
        title: app.translator.trans('core.forum.index.mark_all_as_read_tooltip'),
        icon: 'fas fa-check',
        className: 'Button Button--icon',
        onclick: this.markAllAsRead.bind(this)
      }));
    }

    return items;
  }
  /**
   * Return the current search query, if any. This is implemented to activate
   * the search box in the header.
   *
   * @see Search
   * @return {String}
   */
  ;

  _proto.searching = function searching() {
    return this.params().q;
  }
  /**
   * Redirect to the index page without a search filter. This is called when the
   * 'x' is clicked in the search box in the header.
   *
   * @see Search
   */
  ;

  _proto.clearSearch = function clearSearch() {
    var params = this.params();
    delete params.q;
    m.route(app.route(this.props.routeName, params));
  }
  /**
   * Redirect to the index page using the given sort parameter.
   *
   * @param {String} sort
   */
  ;

  _proto.changeSort = function changeSort(sort) {
    var params = this.params();

    if (sort === Object.keys(app.cache.discussionList.sortMap())[0]) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    m.route(app.route(this.props.routeName, params));
  }
  /**
   * Get URL parameters that stick between filter changes.
   *
   * @return {Object}
   */
  ;

  _proto.stickyParams = function stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q')
    };
  }
  /**
   * Get parameters to pass to the DiscussionList component.
   *
   * @return {Object}
   */
  ;

  _proto.params = function params() {
    var params = this.stickyParams();
    params.filter = m.route.param('filter');
    return params;
  }
  /**
   * Log the user in and then open the composer for a new discussion.
   *
   * @return {Promise}
   */
  ;

  _proto.newDiscussion = function newDiscussion() {
    var deferred = m.deferred();

    if (app.session.user) {
      this.composeNewDiscussion(deferred);
    } else {
      app.modal.show(new flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_9___default.a({
        onlogin: this.composeNewDiscussion.bind(this, deferred)
      }));
    }

    return deferred.promise;
  }
  /**
   * Initialize the composer for a new discussion.
   *
   * @param {Deferred} deferred
   * @return {Promise}
   */
  ;

  _proto.composeNewDiscussion = function composeNewDiscussion(deferred) {
    var component = new flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_8___default.a({
      user: app.session.user
    });
    app.composer.load(component);
    app.composer.show();
    deferred.resolve(component);
    return deferred.promise;
  }
  /**
   * Mark all discussions as read.
   *
   * @return void
   */
  ;

  _proto.markAllAsRead = function markAllAsRead() {
    var confirmation = confirm(app.translator.trans('core.forum.index.mark_all_as_read_confirmation'));

    if (confirmation) {
      app.session.user.save({
        readTime: new Date()
      });
    }
  };

  return PrivateDiscussionIndex;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/PrivateDiscussionList.js":
/*!*******************************************************!*\
  !*** ./src/forum/components/PrivateDiscussionList.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionList */ "flarum/components/DiscussionList");
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionList =
/*#__PURE__*/
function (_DiscussionList) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionList, _DiscussionList);

  function PrivateDiscussionList() {
    return _DiscussionList.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionList.prototype;

  /**
   * Load a new page of discussion results.
   *
   * @param {Integer} offset The index to start the page at.
   * @return {Promise}
   */
  _proto.loadResults = function loadResults(offset) {
    var preloadedDiscussions = app.preloadedDocument();

    if (preloadedDiscussions) {
      return m.deferred().resolve(preloadedDiscussions).promise;
    }

    var params = this.requestParams();
    params.q = 'q=is:private';
    params.page = {
      offset: offset
    };
    params.include = params.include.join(',');
    return app.store.find('discussions', params);
  };

  return PrivateDiscussionList;
}(flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/PrivateDiscussionsUserPage.js":
/*!************************************************************!*\
  !*** ./src/forum/components/PrivateDiscussionsUserPage.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionsUserPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionList */ "flarum/components/DiscussionList");
/* harmony import */ var flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_2__);




var PrivateDiscussionsUserPage =
/*#__PURE__*/
function (_UserPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionsUserPage, _UserPage);

  function PrivateDiscussionsUserPage() {
    return _UserPage.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionsUserPage.prototype;

  _proto.init = function init() {
    _UserPage.prototype.init.call(this);

    this.loadUser(m.route.param('username'));
  };

  _proto.content = function content() {
    return m("div", {
      className: "DiscussionsUserPage"
    }, flarum_components_DiscussionList__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      params: {
        q: "byobu:" + this.user.username() + " is:private",
        sort: 'newest'
      }
    }));
  };

  return PrivateDiscussionsUserPage;
}(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/RecipientSearch.js":
/*!*************************************************!*\
  !*** ./src/forum/components/RecipientSearch.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecipientSearch; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Search */ "flarum/components/Search");
/* harmony import */ var flarum_components_Search__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Search__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sources_UserSearchSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sources/UserSearchSource */ "./src/forum/components/sources/UserSearchSource.js");
/* harmony import */ var _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sources/GroupSearchSource */ "./src/forum/components/sources/GroupSearchSource.js");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/classList */ "flarum/utils/classList");
/* harmony import */ var flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_helpers_recipientLabel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/helpers/recipientLabel */ "./src/common/helpers/recipientLabel.js");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_10__);












var RecipientSearch =
/*#__PURE__*/
function (_Search) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipientSearch, _Search);

  function RecipientSearch() {
    return _Search.apply(this, arguments) || this;
  }

  var _proto = RecipientSearch.prototype;

  _proto.config = function config(isInitialized) {
    var _this = this;

    if (isInitialized) return;
    var $search = this;
    this.$('.Search-results').on('click', function (e) {
      var target = _this.$('.SearchResult.active');

      $search.addRecipient(target.data('index'));
      $search.$('.RecipientsInput').focus();
    });
    this.$('.Search-results').on('touchstart', function (e) {
      var target = _this.$(e.target.parentNode);

      $search.addRecipient(target.data('index'));
      $search.$('.RecipientsInput').focus();
    });

    _Search.prototype.config.call(this, isInitialized);
  };

  _proto.view = function view() {
    var _this2 = this;

    if (typeof this.value() === 'undefined') {
      this.value('');
    }

    var loading = this.value() && this.value().length >= 3;

    if (!this.sources) {
      this.sources = this.sourceItems().toArray();
    }

    return m('div', {
      className: 'AddRecipientModal-form-input'
    }, [m('div', {
      className: 'RecipientsInput-selected RecipientsLabel'
    }, this.props.selected().toArray().map(function (recipient) {
      return Object(_common_helpers_recipientLabel__WEBPACK_IMPORTED_MODULE_8__["default"])(recipient, {
        onclick: function onclick() {
          _this2.removeRecipient(recipient);
        }
      });
    })), m('input', {
      className: 'RecipientsInput FormControl ' + flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default()({
        open: !!this.value(),
        focused: !!this.value(),
        active: !!this.value(),
        loading: !!this.loadingSources
      }),
      config: function config(element) {
        element.focus();
      },
      type: 'search',
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(app.translator.trans('fof-byobu.forum.input.search_recipients')),
      value: this.value(),
      oninput: m.withAttr('value', this.value),
      onfocus: function onfocus() {
        return _this2.hasFocus = true;
      },
      onblur: function onblur() {
        return _this2.hasFocus = false;
      }
    }), m('ul', {
      className: 'Dropdown-menu Search-results fade ' + flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default()({
        "in": !!loading
      })
    }, this.loadingSources ? flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7___default.a.component({
      size: 'tiny',
      className: 'Button Button--icon Button--link'
    }) : this.sources.map(function (source) {
      return source.view(_this2.value());
    }))]);
  }
  /**
   * Build an item list of SearchSources.
   *
   * @return {ItemList}
   */
  ;

  _proto.sourceItems = function sourceItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a(); // Add user source based on permissions.

    if (!this.props.discussion && app.forum.attribute('canStartPrivateDiscussionWithUsers') || this.props.discussion && this.props.discussion.canEditUserRecipients()) {
      items.add('users', new _sources_UserSearchSource__WEBPACK_IMPORTED_MODULE_2__["default"]());
    } // Add group source based on permissions.


    if (!this.props.discussion && app.forum.attribute('canStartPrivateDiscussionWithGroups') || this.props.discussion && this.props.discussion.canEditGroupRecipients()) {
      items.add('groups', new _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }

    return items;
  }
  /**
   * Clear the search input and the current controller's active search.
   */
  ;

  _proto.clear = function clear() {
    this.value('');
    m.redraw();
  }
  /**
   * Adds a recipient.
   *
   * @param value
   */
  ;

  _proto.addRecipient = function addRecipient(value) {
    var values = value.split(':'),
        type = values[0],
        id = values[1];
    var recipient = this.findRecipient(type, id);
    this.props.selected().add(value, recipient);
    this.clear();
  }
  /**
   * Removes a recipient.
   *
   * @param recipient
   */
  ;

  _proto.removeRecipient = function removeRecipient(recipient) {
    var type;

    if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_9___default.a) {
      type = 'users';
    }

    if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_10___default.a) {
      type = 'groups';
    }

    this.props.selected().remove(type + ":" + recipient.id());
    m.redraw();
  }
  /**
   * Loads a recipient from the global store.
   *
   * @param store
   * @param id
   * @returns {Model}
   */
  ;

  _proto.findRecipient = function findRecipient(store, id) {
    return app.store.getById(store, id);
  };

  return RecipientSearch;
}(flarum_components_Search__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/RecipientsModified.js":
/*!****************************************************!*\
  !*** ./src/forum/components/RecipientsModified.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecipientsModified; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/EventPost */ "flarum/components/EventPost");
/* harmony import */ var flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/helpers/recipientsLabel */ "./src/common/helpers/recipientsLabel.js");




var RecipientsModified =
/*#__PURE__*/
function (_EventPost) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipientsModified, _EventPost);

  function RecipientsModified() {
    return _EventPost.apply(this, arguments) || this;
  }

  RecipientsModified.initProps = function initProps(props) {
    _EventPost.initProps.call(this, props);

    function diff(diff1, diff2, store) {
      return diff1.filter(function (item) {
        return diff2.indexOf(item) === -1;
      }).map(function (id) {
        return app.store.getById(store, id);
      });
    }

    var content = props.post.content(); // For event posts existing before groups functionality.

    if (!content['new'] && content.length == 2) {
      var oldRecipients = props.post.content()[0];
      var newRecipients = props.post.content()[1];
      props.added = diff(newRecipients, oldRecipients, 'users');
      props.removed = diff(oldRecipients, newRecipients, 'users');
    } else {
      var usersAdded = diff(content['new']['users'], content['old']['users'], 'users');
      var usersRemoved = diff(content['old']['users'], content['new']['users'], 'users');
      var groupsAdded = diff(content['new']['groups'], content['old']['groups'], 'groups');
      var groupsRemoved = diff(content['old']['groups'], content['new']['groups'], 'groups');
      props.added = usersAdded.concat(groupsAdded);
      props.removed = usersRemoved.concat(groupsRemoved);
    }
  };

  var _proto = RecipientsModified.prototype;

  _proto.icon = function icon() {
    return 'far fa-map';
  };

  _proto.descriptionKey = function descriptionKey() {
    var localeBase = 'fof-byobu.forum.post.recipients_modified.';

    if (this.props.added.length) {
      if (this.props.removed.length) {
        return localeBase + 'added_and_removed';
      }

      return localeBase + 'added';
    }

    return localeBase + 'removed';
  };

  _proto.descriptionData = function descriptionData() {
    var data = {};

    if (this.props.added.length) {
      data.added = Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_2__["default"])(this.props.added, {
        link: true
      });
    }

    if (this.props.removed.length) {
      data.removed = Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_2__["default"])(this.props.removed, {
        link: true
      });
    }

    return data;
  };

  return RecipientsModified;
}(flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/sources/GroupSearchSource.js":
/*!***********************************************************!*\
  !*** ./src/forum/components/sources/GroupSearchSource.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GroupSearchSource; });
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/helpers/highlight */ "flarum/helpers/highlight");
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0__);


var GroupSearchSource =
/*#__PURE__*/
function () {
  function GroupSearchSource() {}

  var _proto = GroupSearchSource.prototype;

  _proto.search = function search(query) {
    return app.store.find('groups', {
      filter: {
        q: query
      },
      page: {
        limit: 5
      }
    });
  };

  _proto.view = function view(query) {
    query = query.toLowerCase();
    var results = app.store.all('groups').filter(function (group) {
      return group.namePlural().toLowerCase().substr(0, query.length) === query;
    });
    if (!results.length) return '';
    return [m("li", {
      className: "Dropdown-header"
    }, app.translator.trans('fof-byobu.forum.search.headings.groups')), results.map(function (group) {
      var groupName = group.namePlural();
      var name = flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0___default()(groupName, query);
      return m("li", {
        className: "SearchResult",
        "data-index": 'groups:' + group.id()
      }, m("a", {
        "data-index": 'groups:' + group.id()
      }, m("span", {
        "class": "groupName"
      }, name)));
    })];
  };

  return GroupSearchSource;
}();



/***/ }),

/***/ "./src/forum/components/sources/UserSearchSource.js":
/*!**********************************************************!*\
  !*** ./src/forum/components/sources/UserSearchSource.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserSearchSource; });
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/helpers/highlight */ "flarum/helpers/highlight");
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/helpers/avatar */ "flarum/helpers/avatar");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2__);




var UserSearchSource =
/*#__PURE__*/
function () {
  function UserSearchSource() {}

  var _proto = UserSearchSource.prototype;

  _proto.search = function search(query) {
    query = query + ' allows-pd';
    return app.store.find('users', {
      filter: {
        q: query
      },
      page: {
        limit: 5
      }
    });
  };

  _proto.view = function view(query) {
    query = query.toLowerCase();
    var results = app.store.all('users').filter(function (user) {
      return user.username().toLowerCase().substr(0, query.length) === query;
    });
    if (!results.length) return '';
    return [m("li", {
      className: "Dropdown-header"
    }, app.translator.trans('core.forum.search.users_heading')), results.map(function (user) {
      var name = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_2___default()(user);
      name.children[0] = flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_0___default()(name.children[0], query);
      return m("li", {
        className: "SearchResult",
        "data-index": 'users:' + user.id()
      }, m("a", {
        "data-index": 'users:' + user.id()
      }, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_1___default()(user), name));
    })];
  };

  return UserSearchSource;
}();



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/models/Discussion */ "flarum/models/Discussion");
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _addRecipientComposer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addRecipientComposer */ "./src/forum/addRecipientComposer.js");
/* harmony import */ var _addRecipientLabels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addRecipientLabels */ "./src/forum/addRecipientLabels.js");
/* harmony import */ var _addRecipientsControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addRecipientsControl */ "./src/forum/addRecipientsControl.js");
/* harmony import */ var _addHasRecipientsBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addHasRecipientsBadge */ "./src/forum/addHasRecipientsBadge.js");
/* harmony import */ var _addDiscussPrivatelyControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addDiscussPrivatelyControl */ "./src/forum/addDiscussPrivatelyControl.js");
/* harmony import */ var _addPrivacySetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addPrivacySetting */ "./src/forum/addPrivacySetting.js");
/* harmony import */ var _addPrivateDiscussionsPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addPrivateDiscussionsPage */ "./src/forum/addPrivateDiscussionsPage.js");
/* harmony import */ var _components_PrivateDiscussionIndex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/PrivateDiscussionIndex */ "./src/forum/components/PrivateDiscussionIndex.js");
/* harmony import */ var _components_RecipientsModified__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/RecipientsModified */ "./src/forum/components/RecipientsModified.js");












app.initializers.add('fof-byobu', function (app) {
  app.routes.private_discussions = {
    path: '/private-discussions',
    component: _components_PrivateDiscussionIndex__WEBPACK_IMPORTED_MODULE_10__["default"].component()
  };
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.recipientUsers = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.hasMany('recipientUsers');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.oldRecipientUsers = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.hasMany('oldRecipientUsers');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.recipientGroups = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.hasMany('recipientGroups');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.oldRecipientGroups = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.hasMany('oldRecipientGroups');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canEditRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.attribute('canEditRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canEditUserRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.attribute('canEditUserRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canEditGroupRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.attribute('canEditGroupRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canEditGroupRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.attribute('canEditGroupRecipients');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.blocksPd = flarum_Model__WEBPACK_IMPORTED_MODULE_0___default.a.attribute('blocksPd');
  app.postComponents.recipientsModified = _components_RecipientsModified__WEBPACK_IMPORTED_MODULE_11__["default"];
  Object(_addRecipientComposer__WEBPACK_IMPORTED_MODULE_3__["default"])(app);
  Object(_addRecipientLabels__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_addRecipientsControl__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_addHasRecipientsBadge__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_addPrivacySetting__WEBPACK_IMPORTED_MODULE_8__["default"])();
  Object(_addDiscussPrivatelyControl__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_addPrivateDiscussionsPage__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/components/Badge":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Badge']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Badge'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DiscussionComposer":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionComposer']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionComposer'];

/***/ }),

/***/ "flarum/components/DiscussionHero":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionHero']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionHero'];

/***/ }),

/***/ "flarum/components/DiscussionList":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionList']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionList'];

/***/ }),

/***/ "flarum/components/DiscussionListItem":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionListItem']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionListItem'];

/***/ }),

/***/ "flarum/components/DiscussionPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionPage']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionPage'];

/***/ }),

/***/ "flarum/components/EventPost":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/EventPost']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/EventPost'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/LogInModal":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LogInModal']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInModal'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Search":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Search']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Search'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/SelectDropdown":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/SelectDropdown']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SelectDropdown'];

/***/ }),

/***/ "flarum/components/SettingsPage":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsPage']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsPage'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/components/UserPage":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserPage']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserPage'];

/***/ }),

/***/ "flarum/components/WelcomeHero":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/WelcomeHero']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/WelcomeHero'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/avatar":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['helpers/avatar']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/avatar'];

/***/ }),

/***/ "flarum/helpers/highlight":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/highlight']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/highlight'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/helpers/listItems":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/listItems']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/listItems'];

/***/ }),

/***/ "flarum/helpers/username":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['helpers/username']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/username'];

/***/ }),

/***/ "flarum/models/Discussion":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['models/Discussion']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Discussion'];

/***/ }),

/***/ "flarum/models/Group":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['models/Group']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Group'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/DiscussionControls":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['utils/DiscussionControls']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/DiscussionControls'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/UserControls":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/UserControls']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/UserControls'];

/***/ }),

/***/ "flarum/utils/classList":
/*!********************************************************!*\
  !*** external "flarum.core.compat['utils/classList']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/classList'];

/***/ }),

/***/ "flarum/utils/extract":
/*!******************************************************!*\
  !*** external "flarum.core.compat['utils/extract']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extract'];

/***/ }),

/***/ "flarum/utils/extractText":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['utils/extractText']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extractText'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map