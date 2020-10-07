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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_common__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helpers", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_1__["helpers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_1__["components"]; });




/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

/***/ "./src/common/helpers/index.js":
/*!*************************************!*\
  !*** ./src/common/helpers/index.js ***!
  \*************************************/
/*! exports provided: helpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helpers", function() { return helpers; });
/* harmony import */ var _recipientCountLabel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./recipientCountLabel */ "./src/common/helpers/recipientCountLabel.js");
/* harmony import */ var _recipientLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipientLabel */ "./src/common/helpers/recipientLabel.js");
/* harmony import */ var _recipientsLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recipientsLabel */ "./src/common/helpers/recipientsLabel.js");



var helpers = {
  recipientCountLabel: _recipientCountLabel__WEBPACK_IMPORTED_MODULE_0__["default"],
  recipientLabel: _recipientLabel__WEBPACK_IMPORTED_MODULE_1__["default"],
  recipientsLabel: _recipientsLabel__WEBPACK_IMPORTED_MODULE_2__["default"]
};

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
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__);





function recipientLabel(recipient, attrs) {
  if (attrs === void 0) {
    attrs = {};
  }

  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');
  attrs.href = flarum_utils_extract__WEBPACK_IMPORTED_MODULE_0___default()(attrs, 'link');
  var label;

  if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default.a) {
    label = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_1___default()(recipient);

    if (attrs.href) {
      attrs.title = recipient.username() || '';
      attrs.href = app.route.user(recipient);
    }
  } else if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_3___default.a) {
    label = recipient.namePlural();
  } else {
    attrs.className += ' none';
    label = app.translator.trans('fof-byobu.forum.labels.user_deleted');
  }

  return flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default.a.component(attrs, label);
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
/* harmony import */ var _components_PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PrivateDiscussionComposer */ "./src/forum/components/PrivateDiscussionComposer.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Add a control allowing the discussion to be moved to another category.
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_1___default.a, 'userControls', function (items, user) {
    if (app.session.user && app.session.user.id() !== user.id() && app.forum.attribute('canStartPrivateDiscussion') && (user.blocksPd() === false || app.forum.attribute('canStartPrivateDiscussionWithBlockers') && user.cannotBeDirectMessaged())) {
      items.add('private-discussion', flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        icon: 'far fa-map',
        onclick: function onclick(e) {
          e.preventDefault();
          return new Promise(function (resolve) {
            var recipients = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a();
            recipients.add('users:' + app.session.user.id(), app.session.user);
            recipients.add('users:' + user.id(), user);
            _components_PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.recipients = recipients;
            app.composer.load(_components_PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_2__["default"], {
              user: app.session.user,
              recipients: recipients,
              recipientUsers: recipients,
              titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
              submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button')
            });
            app.composer.show();
            return resolve(app.composer);
          });
        }
      }, app.translator.trans('fof-byobu.forum.buttons.send_pd', {
        username: user.username()
      })));
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
      state: this.user.preferences().blocksPd,
      onchange: function onchange(value) {
        _this.blocksPdLoading = true;

        _this.user.savePreferences({
          blocksPd: value
        }).then(function () {
          _this.blocksPdLoading = false;
          m.redraw();
        });
      },
      loading: this.blocksPdLoading
    }, app.translator.trans('fof-byobu.forum.user.settings.block_pd')));
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
  app.routes['user.byobu'] = {
    path: '/u/:username/byobu',
    component: _components_PrivateDiscussionsUserPage__WEBPACK_IMPORTED_MODULE_3__["default"]
  };
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'navItems', function (items) {
    var href = app.route('user.byobu', {
      username: this.user.username()
    }); // Hide links from guests if they are not already on the page

    if (!app.session.user && m.route.get() !== href) return;
    items.add('byobu', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      href: href,
      icon: 'fas fa-map'
    }, app.translator.trans('fof-byobu.forum.user.byobu_link')), 85);
  });
});

/***/ }),

/***/ "./src/forum/addPrivateDiscussionsToSessionDropdown.js":
/*!*************************************************************!*\
  !*** ./src/forum/addPrivateDiscussionsToSessionDropdown.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SessionDropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SessionDropdown */ "flarum/components/SessionDropdown");
/* harmony import */ var flarum_components_SessionDropdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SessionDropdown__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SessionDropdown__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    var user = app.session.user;
    items.add('privateDiscussions', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      icon: 'fas fa-map',
      href: app.route('user.byobu', {
        username: user.username()
      })
    }, app.translator.trans('fof-byobu.forum.user.dropdown_label')), 99);
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'navItems', function (items) {
    var user = app.session.user;

    if (app.forum.attribute('byobuOnIndex') && user) {
      items.add('privateDiscussions', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default.a.component({
        icon: 'fas fa-map',
        href: app.route('user.byobu', {
          username: user.username()
        })
      }, app.translator.trans('fof-byobu.forum.user.dropdown_label')), 75);
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
/* harmony import */ var flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/states/DiscussionListState */ "flarum/states/DiscussionListState");
/* harmony import */ var flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_4__);
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
    var discussion = this.attrs.discussion;
    addToDiscussion(discussion, items, true);
  });
  /**
   * Require recipients from the API whenever we're loading a Discussion page.
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'params', function (params) {
    params.include.push('recipientUsers');
    params.include.push('recipientGroups');
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'requestParams', function (params) {
    params.include.push('recipientUsers');
    params.include.push('recipientGroups');
  });
  /**
   * Adds User labels on the discussion Hero.
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'items', function (items) {
    var discussion = this.attrs.discussion;
    addToDiscussion(discussion, items, false);
  });
  /**
   * Adds 'hasPrivateMessages' to the class, if we're looking at a private discussion.
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'oncreate', function () {
    if (!app.forum.attribute('byobuTag')) return;
    var discussion = this.attrs.discussion;

    if (discussion.recipientUsers().length || discussion.recipientGroups().length) {
      var items = document.getElementsByClassName('DiscussionHero-items');
      var children = items[0].children;
      var recipients = 'item-recipients';
      var classes = [];
      Object.keys(children).forEach(function (item) {
        classes.push(children[item].className);
      });
      var privateDiscussion = classes.filter(function (i) {
        return i === recipients;
      });

      if (privateDiscussion.length) {
        items[0].className = items[0].className + " isPrivateDiscussion";
      }
    }
  });
  /**
   * Remove tag from private discussions in discussion list
   */

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionListItem__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'oncreate', function () {
    if (!app.forum.attribute('byobuTag')) return;
    var tagsClassName = '.item-tags';
    var recipientsClassName = '.DiscussionListItem-info > .item-recipients';
    $(recipientsClassName).prev(tagsClassName).css('display', 'none');
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
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/AddRecipientModal */ "./src/forum/components/AddRecipientModal.js");







/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Add a control allowing the discussion to be moved to another category.
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default.a, 'moderationControls', function (items, discussion) {
    if (discussion.canEditRecipients()) {
      items.add('recipients', flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        icon: 'far fa-map',
        onclick: function onclick() {
          return app.modal.show(_components_AddRecipientModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
            discussion: discussion
          });
        }
      }, app.translator.trans('fof-byobu.forum.buttons.edit_recipients')));
    }

    if (discussion.recipientUsers().length > 0 && discussion.canMakePublic()) {
      items.add('make_public', flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        icon: 'far fa-eye',
        onclick: function onclick() {
          if (discussion && confirm(app.translator.trans('fof-byobu.forum.confirm.make_public'))) {
            var recipientGroups = [];
            var recipientUsers = [];
            discussion.save({
              relationships: {
                recipientUsers: recipientUsers,
                recipientGroups: recipientGroups
              }
            }).then(function () {
              return m.redraw();
            });
          }
        }
      }, app.translator.trans('fof-byobu.forum.buttons.make_public')));
    }

    if (discussion.recipientUsers().length > 1) {
      items.add('remove', flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        icon: 'fas fa-user-slash',
        onclick: function onclick() {
          if (discussion) {
            var recipients = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2___default.a();
            discussion.recipientUsers().map(function (user) {
              if (app.session.user.id() !== user.id()) {
                recipients.add('users:' + user.id(), user);
              }
            });
            var recipientGroups = [];
            var recipientUsers = [];
            recipients.toArray().forEach(function (recipient) {
              if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a) {
                recipientUsers.push(recipient);
              }

              if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_4___default.a) {
                recipientGroups.push(recipient);
              }
            });
            discussion.save({
              relationships: {
                recipientUsers: recipientUsers,
                recipientGroups: recipientGroups
              }
            }).then(function () {
              return app.history.back();
            });
          }
        }
      }, app.translator.trans('fof-byobu.forum.buttons.remove_from_discussion')));
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
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_states_SearchState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/states/SearchState */ "flarum/states/SearchState");
/* harmony import */ var flarum_states_SearchState__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_states_SearchState__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _RecipientSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RecipientSearch */ "./src/forum/components/RecipientSearch.js");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_9__);











var AddRecipientModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AddRecipientModal, _Modal);

  function AddRecipientModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = AddRecipientModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.selected = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a());
    console.log(this.attrs);

    if (this.attrs.discussion) {
      // Adds recipients of the currently viewed discussion.
      this.assignInitialRecipients(this.attrs.discussion);
    } else if (this.attrs.selectedRecipients && this.attrs.selectedRecipients.toArray().length > 0) {
      // Adds previously selected recipients.
      this.selected().merge(this.attrs.selectedRecipients);
    } else {
      // Adds the current user in case there are no selected recipients yet and this is a new discussion.
      this.selected().add('users:' + app.session.user.id(), app.session.user);
    }

    this.recipientSearch = new flarum_states_SearchState__WEBPACK_IMPORTED_MODULE_6___default.a();
  };

  _proto.isDismissible = function isDismissible() {
    return false;
  };

  _proto.assignInitialRecipients = function assignInitialRecipients(discussion) {
    var _this = this;

    discussion.recipientUsers().map(function (user) {
      _this.selected().add('users:' + user.id(), user);
    });
    discussion.recipientGroups().map(function (group) {
      _this.selected().add('groups:' + group.id(), group);
    });
  };

  _proto.className = function className() {
    return 'AddRecipientModal';
  };

  _proto.title = function title() {
    return this.attrs.discussion ? app.translator.trans('fof-byobu.forum.modal.titles.update_recipients', {
      title: m("em", null, this.attrs.discussion.title())
    }) : app.translator.trans('fof-byobu.forum.modal.titles.add_recipients');
  };

  _proto.helpText = function helpText() {
    return this.attrs.discussion ? app.translator.trans('fof-byobu.forum.modal.help.update_recipients') : app.translator.trans('fof-byobu.forum.modal.help.add_recipients');
  };

  _proto.content = function content() {
    var isDisabled = this.selected().toArray().length < 2;
    return [m("div", {
      className: "Modal-body"
    }, m("div", {
      "class": "AddRecipientModal-help"
    }, this.helpText()), m("div", {
      className: "AddRecipientModal-form"
    }, _RecipientSearch__WEBPACK_IMPORTED_MODULE_7__["default"].component({
      state: this.recipientSearch,
      selected: this.selected,
      discussion: this.attrs.discussion
    }), m("div", {
      className: "AddRecipientModal-form-submit App-primaryControl"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      disabled: isDisabled,
      icon: 'fas fa-check'
    }, app.translator.trans('fof-byobu.forum.buttons.submit')), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      onclick: this.hide.bind(this),
      className: 'Button Button--cancel'
    }, app.translator.trans('fof-byobu.forum.buttons.cancel')))))];
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
    var discussion = this.attrs.discussion;
    var recipients = this.selected();
    var recipientGroups = [];
    var recipientUsers = [];
    recipients.toArray().forEach(function (recipient) {
      if (recipient instanceof flarum_models_User__WEBPACK_IMPORTED_MODULE_8___default.a) {
        recipientUsers.push(recipient);
      }

      if (recipient instanceof flarum_models_Group__WEBPACK_IMPORTED_MODULE_9___default.a) {
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


    if (this.attrs.onsubmit) this.attrs.onsubmit(recipients);
    app.modal.close();

    if (!this.attrs.discussion) {
      app.composer.show();
    }

    e.redraw = false;
  };

  return AddRecipientModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/PrivateDiscussionComposer.js":
/*!***********************************************************!*\
  !*** ./src/forum/components/PrivateDiscussionComposer.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionComposer; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AddRecipientModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddRecipientModal */ "./src/forum/components/AddRecipientModal.js");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_helpers_recipientCountLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/helpers/recipientCountLabel */ "./src/common/helpers/recipientCountLabel.js");






var PrivateDiscussionComposer = /*#__PURE__*/function (_DiscussionComposer) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionComposer, _DiscussionComposer);

  function PrivateDiscussionComposer() {
    return _DiscussionComposer.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionComposer.prototype;

  _proto.oninit = function oninit(vnode) {
    _DiscussionComposer.prototype.oninit.call(this, vnode);

    this.recipients = this.attrs.recipients || new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    this.recipientUsers = this.attrs.recipientUsers || [];
    this.recipientGroups = this.attrs.recipientGroups || [];
    var username = m.route.param('username');

    if (typeof username !== 'undefined') {
      this.addDefaultRecipients(username);
    }
  };

  _proto.oncreate = function oncreate(vnode) {
    _DiscussionComposer.prototype.oncreate.call(this, vnode);

    if (this.recipients.length < 0) {
      this.chooseRecipients();
    }
  };

  _proto.data = function data() {
    var data = _DiscussionComposer.prototype.data.call(this);

    var users = [];
    var groups = [];
    this.recipients.forEach(function (recipient) {
      if (recipient instanceof User) {
        users.push(recipient);
      }

      if (recipient instanceof Group) {
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

    return data;
  };

  _proto.chooseRecipients = function chooseRecipients() {
    var _this = this;

    app.modal.show(_AddRecipientModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selectedRecipients: this.recipients,
      onsubmit: function onsubmit(recipients) {
        _this.recipients = recipients; // Focus on recipient autocomplete field.

        _this.$('.RecipientsInput').focus();
      }
    });
  };

  _proto.headerItems = function headerItems() {
    var items = _DiscussionComposer.prototype.headerItems.call(this);

    items.remove('tags');

    if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
      var recipients = this.recipients;
      items.add('recipients', m("a", {
        className: "PrivateDiscussionComposer-changeRecipients",
        onclick: this.chooseRecipients.bind(this)
      }, recipients.length ? Object(_common_helpers_recipientCountLabel__WEBPACK_IMPORTED_MODULE_4__["default"])(recipients.length) : m("span", {
        className: "RecipientLabel none"
      }, app.translator.trans('fof-byobu.forum.buttons.add_recipients'))), 5);
    }

    return items;
  };

  _proto.addDefaultRecipients = function addDefaultRecipients(username) {
    var user = app.store.getBy('users', 'username', username);
    this.recipients.add('users:' + app.session.user.id(), app.session.user);

    if (user.id() !== app.session.user.id()) {
      this.recipients.add('users:' + user.id(), user);
    }
  };

  _proto.onsubmit = function onsubmit() {
    this.loading = true;
    var recipients = this.recipients.toArray();

    if (recipients.length < 2) {
      app.modal.show(_AddRecipientModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
        selectedRecipients: recipients
      });
      this.loading = false;
    } else {
      var data = this.data();
      app.store.createRecord('discussions').save(data).then(function (discussion) {
        if (app.cache.discussionList) {
          app.cache.discussionList.refresh();
        }

        m.route.set(app.route.discussion(discussion));
        app.composer.hide();
      }, this.loaded.bind(this));
    }
  };

  return PrivateDiscussionComposer;
}(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a);



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



var PrivateDiscussionList = /*#__PURE__*/function (_DiscussionList) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionList, _DiscussionList);

  function PrivateDiscussionList() {
    return _DiscussionList.apply(this, arguments) || this;
  }

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
/* harmony import */ var _states_PrivateDiscussionListState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../states/PrivateDiscussionListState */ "./src/forum/states/PrivateDiscussionListState.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/helpers/listItems */ "flarum/helpers/listItems");
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PrivateDiscussionComposer */ "./src/forum/components/PrivateDiscussionComposer.js");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PrivateDiscussionList */ "./src/forum/components/PrivateDiscussionList.js");











var PrivateDiscussionsUserPage = /*#__PURE__*/function (_UserPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionsUserPage, _UserPage);

  function PrivateDiscussionsUserPage() {
    return _UserPage.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionsUserPage.prototype;

  _proto.oninit = function oninit(vnode) {
    _UserPage.prototype.oninit.call(this, vnode);

    this.changeSort('latest');
  };

  _proto.show = function show(user) {
    // We can not create the list in init because the user will not be available if it has to be loaded asynchronously
    this.list = new _states_PrivateDiscussionListState__WEBPACK_IMPORTED_MODULE_2__["default"]({
      q: "byobu:" + user.username() + " is:private",
      sort: this.sort
    });
    this.list.refresh(); // We call the parent method after creating the list, this way the this.list property
    // is set before content() is called for the first time

    _UserPage.prototype.show.call(this, user);
  };

  _proto.handleChangeSort = function handleChangeSort(sort, e) {
    e.preventDefault();
    this.changeSort(sort);
  };

  _proto.changeSort = function changeSort(sort) {
    this.sort = sort;
    this.loadUser(m.route.param('username'));
  };

  _proto.newDiscussionAction = function newDiscussionAction(e) {
    var _this = this;

    e.preventDefault();
    return new Promise(function (resolve, reject) {
      if (app.session.user) {
        var recipients = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default.a();
        recipients.add('users:' + app.session.user.id(), app.session.user);

        if (_this.user !== null && app.session.user.id() !== _this.user.id()) {
          recipients.add('users:' + _this.user.id(), _this.user);
        }

        app.composer.load(_PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_7__["default"], {
          user: app.session.user,
          recipients: recipients,
          recipientUsers: recipients,
          titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
          submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button')
        });
        return resolve(app.composer);
      } else {
        app.modal.show(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_8___default.a);
        return reject();
      }
    });
  };

  _proto.content = function content() {
    return m("div", {
      className: "DiscussionsUserPage"
    }, m("div", {
      className: "DiscussionsUserPage-toolbar"
    }, m("ul", {
      className: "DiscussionsUserPage-toolbar-action"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_6___default()(this.actionItems().toArray())), m("ul", {
      className: "DiscussionsUserPage-toolbar-view"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_6___default()(this.viewItems().toArray()))), m(_PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_9__["default"], {
      state: this.list
    }));
  };

  _proto.actionItems = function actionItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default.a();
    var canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

    if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
      items.add('start_private', flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        icon: 'fas fa-pen',
        className: 'Button Button--primary IndexPage-newDiscussion',
        itemClassName: 'fof-byobu_primaryControl',
        onclick: this.newDiscussionAction.bind(this),
        disabled: !canStartDiscussion
      }, app.translator.trans(canStartDiscussion ? 'fof-byobu.forum.nav.start_button' : 'core.forum.index.cannot_start_discussion_button')));
    }

    return items;
  };

  _proto.viewItems = function viewItems() {
    var _this2 = this;

    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default.a();
    var sortMap = this.list.sortMap();
    var sortOptions = {};

    for (var i in sortMap) {
      sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
    }

    items.add('sort', flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      buttonClassName: 'Button',
      label: sortOptions[this.sort] || Object.keys(sortMap).map(function (key) {
        return sortOptions[key];
      })[0]
    }, Object.keys(sortOptions).map(function (value) {
      var label = sortOptions[value];
      var active = (_this2.sort || Object.keys(sortMap)[0]) === value;
      return flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        icon: active ? 'fas fa-check' : true,
        onclick: _this2.handleChangeSort.bind(_this2, value),
        active: active
      }, label);
    })));
    return items;
  };

  return PrivateDiscussionsUserPage;
}(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/RecipientLeft.js":
/*!***********************************************!*\
  !*** ./src/forum/components/RecipientLeft.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecipientLeft; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/EventPost */ "flarum/components/EventPost");
/* harmony import */ var flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1__);



var RecipientLeft = /*#__PURE__*/function (_EventPost) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipientLeft, _EventPost);

  function RecipientLeft() {
    return _EventPost.apply(this, arguments) || this;
  }

  RecipientLeft.initAttrs = function initAttrs(attrs) {
    _EventPost.initAttrs.call(this, attrs);
  };

  var _proto = RecipientLeft.prototype;

  _proto.icon = function icon() {
    return 'far fa-map';
  };

  _proto.descriptionKey = function descriptionKey() {
    return 'fof-byobu.forum.post.recipients_modified.removed_self';
  };

  return RecipientLeft;
}(flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1___default.a);



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












var RecipientSearch = /*#__PURE__*/function (_Search) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipientSearch, _Search);

  function RecipientSearch() {
    return _Search.apply(this, arguments) || this;
  }

  var _proto = RecipientSearch.prototype;

  _proto.oncreate = function oncreate(vnode) {
    var _this = this;

    _Search.prototype.oncreate.call(this, vnode);

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
    $('.RecipientsInput').on('keyup', function () {
      clearTimeout(_this.typingTimer);
      _this.doSearch = false;
      _this.typingTimer = setTimeout(function () {
        _this.doSearch = true;
        m.redraw();
      }, 900);
    }).on('keydown', function () {
      clearTimeout(_this.typingTimer);
    });

    _Search.prototype.oncreate.call(this, vnode);
  };

  _proto.view = function view() {
    var _this2 = this;

    if (typeof this.state.getValue() === 'undefined') {
      this.state.setValue('');
    }

    var loading = this.state.getValue() && this.state.getValue().length >= 3;

    if (!this.sources) {
      this.sources = this.sourceItems().toArray();
    }

    return m('div', {
      className: 'AddRecipientModal-form-input'
    }, [m('div', {
      className: 'RecipientsInput-selected RecipientsLabel'
    }, this.attrs.selected().toArray().map(function (recipient) {
      return Object(_common_helpers_recipientLabel__WEBPACK_IMPORTED_MODULE_8__["default"])(recipient, {
        onclick: function onclick() {
          _this2.removeRecipient(recipient);
        }
      });
    })), m('input', {
      className: 'RecipientsInput FormControl ' + flarum_utils_classList__WEBPACK_IMPORTED_MODULE_5___default()({
        open: !!this.state.getValue(),
        focused: !!this.state.getValue(),
        active: !!this.state.getValue(),
        loading: !!this.loadingSources
      }),
      oncreate: function oncreate(vnode) {
        vnode.dom.focus();
      },
      type: 'search',
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(app.translator.trans('fof-byobu.forum.input.search_recipients')),
      value: this.state.getValue(),
      oninput: function oninput(e) {
        return _this2.state.setValue(e.target.value);
      },
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
    }, !this.doSearch ? flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7___default.a.component({
      size: 'tiny',
      className: 'Button Button--icon Button--link'
    }) : this.sources.map(function (source) {
      return source.view(_this2.state.getValue());
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

    if (!this.attrs.discussion && app.forum.attribute('canStartPrivateDiscussionWithUsers') || this.attrs.discussion && this.attrs.discussion.canEditUserRecipients()) {
      items.add('users', new _sources_UserSearchSource__WEBPACK_IMPORTED_MODULE_2__["default"]());
    } // Add group source based on permissions.


    if (!this.attrs.discussion && app.forum.attribute('canStartPrivateDiscussionWithGroups') || this.attrs.discussion && this.attrs.discussion.canEditGroupRecipients()) {
      items.add('groups', new _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }

    return items;
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
    this.attrs.selected().add(value, recipient);
    this.state.clear();
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

    this.attrs.selected().remove(type + ':' + recipient.id());
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




var RecipientsModified = /*#__PURE__*/function (_EventPost) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipientsModified, _EventPost);

  function RecipientsModified() {
    return _EventPost.apply(this, arguments) || this;
  }

  RecipientsModified.initAttrs = function initAttrs(attrs) {
    _EventPost.initAttrs.call(this, attrs);

    function diff(diff1, diff2, store) {
      return diff1.filter(function (item) {
        return diff2.indexOf(item) === -1;
      }).map(function (id) {
        return app.store.getById(store, id);
      });
    }

    var content = attrs.post.content(); // For event posts existing before groups functionality.

    if (!content['new'] && content.length == 2) {
      var oldRecipients = attrs.post.content()[0];
      var newRecipients = attrs.post.content()[1];
      attrs.added = diff(newRecipients, oldRecipients, 'users');
      attrs.removed = diff(oldRecipients, newRecipients, 'users');
    } else {
      var usersAdded = diff(content['new']['users'], content['old']['users'], 'users');
      var usersRemoved = diff(content['old']['users'], content['new']['users'], 'users');
      var groupsAdded = diff(content['new']['groups'], content['old']['groups'], 'groups');
      var groupsRemoved = diff(content['old']['groups'], content['new']['groups'], 'groups');
      attrs.added = usersAdded.concat(groupsAdded);
      attrs.removed = usersRemoved.concat(groupsRemoved);
    }
  };

  var _proto = RecipientsModified.prototype;

  _proto.icon = function icon() {
    return 'far fa-map';
  };

  _proto.descriptionKey = function descriptionKey() {
    var localeBase = 'fof-byobu.forum.post.recipients_modified.';

    if (this.attrs.added.length) {
      if (this.attrs.removed.length) {
        return localeBase + 'added_and_removed';
      }

      return localeBase + 'added';
    }

    return localeBase + 'removed';
  };

  _proto.descriptionData = function descriptionData() {
    var data = {};

    if (this.attrs.added.length) {
      data.added = Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_2__["default"])(this.attrs.added, {
        link: true
      });
    }

    if (this.attrs.removed.length) {
      data.removed = Object(_common_helpers_recipientsLabel__WEBPACK_IMPORTED_MODULE_2__["default"])(this.attrs.removed, {
        link: true
      });
    }

    return data;
  };

  return RecipientsModified;
}(flarum_components_EventPost__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/index.js":
/*!***************************************!*\
  !*** ./src/forum/components/index.js ***!
  \***************************************/
/*! exports provided: components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* harmony import */ var _PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrivateDiscussionComposer */ "./src/forum/components/PrivateDiscussionComposer.js");
/* harmony import */ var _AddRecipientModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddRecipientModal */ "./src/forum/components/AddRecipientModal.js");
/* harmony import */ var _notifications_PrivateDiscussionAddedNotification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifications/PrivateDiscussionAddedNotification */ "./src/forum/components/notifications/PrivateDiscussionAddedNotification.js");
/* harmony import */ var _PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrivateDiscussionList */ "./src/forum/components/PrivateDiscussionList.js");
/* harmony import */ var _notifications_PrivateDiscussionNotification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifications/PrivateDiscussionNotification */ "./src/forum/components/notifications/PrivateDiscussionNotification.js");
/* harmony import */ var _notifications_PrivateDiscussionReplyNotification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications/PrivateDiscussionReplyNotification */ "./src/forum/components/notifications/PrivateDiscussionReplyNotification.js");
/* harmony import */ var _PrivateDiscussionsUserPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PrivateDiscussionsUserPage */ "./src/forum/components/PrivateDiscussionsUserPage.js");
/* harmony import */ var _notifications_PrivateDiscussionUserLeftNotification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notifications/PrivateDiscussionUserLeftNotification */ "./src/forum/components/notifications/PrivateDiscussionUserLeftNotification.js");
/* harmony import */ var _RecipientLeft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RecipientLeft */ "./src/forum/components/RecipientLeft.js");
/* harmony import */ var _RecipientSearch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RecipientSearch */ "./src/forum/components/RecipientSearch.js");
/* harmony import */ var _RecipientsModified__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./RecipientsModified */ "./src/forum/components/RecipientsModified.js");
/* harmony import */ var _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sources/GroupSearchSource */ "./src/forum/components/sources/GroupSearchSource.js");













var components = {
  AddRecipientModal: _AddRecipientModal__WEBPACK_IMPORTED_MODULE_1__["default"],
  PrivateDiscussionAddedNotification: _notifications_PrivateDiscussionAddedNotification__WEBPACK_IMPORTED_MODULE_2__["default"],
  PrivateDiscussionComposer: _PrivateDiscussionComposer__WEBPACK_IMPORTED_MODULE_0__["default"],
  PrivateDiscussionList: _PrivateDiscussionList__WEBPACK_IMPORTED_MODULE_3__["default"],
  PrivateDiscussionNotification: _notifications_PrivateDiscussionNotification__WEBPACK_IMPORTED_MODULE_4__["default"],
  PrivateDiscussionReplyNotification: _notifications_PrivateDiscussionReplyNotification__WEBPACK_IMPORTED_MODULE_5__["default"],
  PrivateDiscussionUserPage: _PrivateDiscussionsUserPage__WEBPACK_IMPORTED_MODULE_6__["default"],
  PrivateDiscussionUserLeftNotification: _notifications_PrivateDiscussionUserLeftNotification__WEBPACK_IMPORTED_MODULE_7__["default"],
  RecipientLeft: _RecipientLeft__WEBPACK_IMPORTED_MODULE_8__["default"],
  RecipientSearch: _RecipientSearch__WEBPACK_IMPORTED_MODULE_9__["default"],
  RecipientsModified: _RecipientsModified__WEBPACK_IMPORTED_MODULE_10__["default"],
  sources: {
    GroupSearchSource: _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_11__["default"],
    UserSearchSource: _sources_GroupSearchSource__WEBPACK_IMPORTED_MODULE_11__["default"]
  }
};

/***/ }),

/***/ "./src/forum/components/notifications/PrivateDiscussionAddedNotification.js":
/*!**********************************************************************************!*\
  !*** ./src/forum/components/notifications/PrivateDiscussionAddedNotification.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionAddedNotification; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionAddedNotification = /*#__PURE__*/function (_Notification) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionAddedNotification, _Notification);

  function PrivateDiscussionAddedNotification() {
    return _Notification.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionAddedNotification.prototype;

  _proto.icon = function icon() {
    return 'fas fa-map';
  };

  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return app.route.discussion(discussion);
  };

  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_added_text', {
      user: user
    });
  };

  return PrivateDiscussionAddedNotification;
}(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/notifications/PrivateDiscussionMadePublicNotification.js":
/*!***************************************************************************************!*\
  !*** ./src/forum/components/notifications/PrivateDiscussionMadePublicNotification.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionMadePublicNotification; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionMadePublicNotification = /*#__PURE__*/function (_Notification) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionMadePublicNotification, _Notification);

  function PrivateDiscussionMadePublicNotification() {
    return _Notification.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionMadePublicNotification.prototype;

  _proto.icon = function icon() {
    return 'fas fa-map';
  };

  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return app.route.discussion(discussion);
  };

  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_made_public_text', {
      user: user
    });
  };

  return PrivateDiscussionMadePublicNotification;
}(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/notifications/PrivateDiscussionNotification.js":
/*!*****************************************************************************!*\
  !*** ./src/forum/components/notifications/PrivateDiscussionNotification.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionNotification; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionNotification = /*#__PURE__*/function (_Notification) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionNotification, _Notification);

  function PrivateDiscussionNotification() {
    return _Notification.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionNotification.prototype;

  _proto.icon = function icon() {
    return 'fas fa-map';
  };

  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return app.route.discussion(discussion);
  };

  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_text', {
      user: user
    });
  };

  return PrivateDiscussionNotification;
}(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/notifications/PrivateDiscussionReplyNotification.js":
/*!**********************************************************************************!*\
  !*** ./src/forum/components/notifications/PrivateDiscussionReplyNotification.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionReplyNotification; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionReplyNotification = /*#__PURE__*/function (_Notification) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionReplyNotification, _Notification);

  function PrivateDiscussionReplyNotification() {
    return _Notification.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionReplyNotification.prototype;

  _proto.icon = function icon() {
    return 'fas fa-reply';
  };

  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    var content = notification.content() || {};
    return app.route.discussion(discussion, content.postNumber);
  };

  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_reply_text', {
      user: user
    });
  };

  return PrivateDiscussionReplyNotification;
}(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/notifications/PrivateDiscussionUserLeftNotification.js":
/*!*************************************************************************************!*\
  !*** ./src/forum/components/notifications/PrivateDiscussionUserLeftNotification.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionUserLeftNotification; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionUserLeftNotification = /*#__PURE__*/function (_Notification) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionUserLeftNotification, _Notification);

  function PrivateDiscussionUserLeftNotification() {
    return _Notification.apply(this, arguments) || this;
  }

  var _proto = PrivateDiscussionUserLeftNotification.prototype;

  _proto.icon = function icon() {
    return 'fas fa-map';
  };

  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return app.route.discussion(discussion);
  };

  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return app.translator.trans('fof-byobu.forum.notifications.pd_user_left_text', {
      user: user
    });
  };

  return PrivateDiscussionUserLeftNotification;
}(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default.a);



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


var GroupSearchSource = /*#__PURE__*/function () {
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
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/helpers/highlight */ "flarum/helpers/highlight");
/* harmony import */ var flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/avatar */ "flarum/helpers/avatar");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3__);





var UserSearchSource = /*#__PURE__*/function () {
  function UserSearchSource() {}

  var _proto = UserSearchSource.prototype;

  _proto.view = function view(query) {
    var _this = this;

    if (query.length < 3 || this.loading) return;

    if (!app.cache.byobuResults) {
      app.cache.byobuResults = [];
    }

    this.query = query;

    if (!app.cache.byobuResults[this.query]) {
      this.loading = true;
      app.cache.byobuResults[this.query] = [];
      app.store.find('users', {
        filter: {
          q: this.query + ' allows-pd'
        },
        page: {
          limit: 5
        }
      }).then(this.pushResults.bind(this));
    } else return [m("li", {
      className: "Dropdown-header"
    }, app.translator.trans('core.forum.search.users_heading')), app.cache.byobuResults[this.query].map(function (user) {
      var name = flarum_helpers_username__WEBPACK_IMPORTED_MODULE_3___default()(user);
      var children = [flarum_helpers_highlight__WEBPACK_IMPORTED_MODULE_1___default()(name.text, _this.query)];
      return m("li", {
        className: "SearchResult",
        "data-index": 'users:' + user.id()
      }, m("a", {
        "data-index": 'users:' + user.id()
      }, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_2___default()(user), Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, name, {
        text: undefined,
        children: children
      })));
    })];
  };

  _proto.pushResults = function pushResults(results) {
    var _this2 = this;

    results.payload.data.map(function (result) {
      var user = app.store.getById('users', result.id);

      app.cache.byobuResults[_this2.query].push(user);
    });
    this.loading = false;
    m.redraw();
  };

  return UserSearchSource;
}();



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! exports provided: helpers, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/Discussion */ "flarum/models/Discussion");
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _addRecipientLabels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addRecipientLabels */ "./src/forum/addRecipientLabels.js");
/* harmony import */ var _addRecipientsControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addRecipientsControl */ "./src/forum/addRecipientsControl.js");
/* harmony import */ var _addHasRecipientsBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addHasRecipientsBadge */ "./src/forum/addHasRecipientsBadge.js");
/* harmony import */ var _addDiscussPrivatelyControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addDiscussPrivatelyControl */ "./src/forum/addDiscussPrivatelyControl.js");
/* harmony import */ var _addPrivacySetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addPrivacySetting */ "./src/forum/addPrivacySetting.js");
/* harmony import */ var _addPrivateDiscussionsPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addPrivateDiscussionsPage */ "./src/forum/addPrivateDiscussionsPage.js");
/* harmony import */ var flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/components/NotificationGrid */ "flarum/components/NotificationGrid");
/* harmony import */ var flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_notifications_PrivateDiscussionNotification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/notifications/PrivateDiscussionNotification */ "./src/forum/components/notifications/PrivateDiscussionNotification.js");
/* harmony import */ var _components_notifications_PrivateDiscussionReplyNotification__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/notifications/PrivateDiscussionReplyNotification */ "./src/forum/components/notifications/PrivateDiscussionReplyNotification.js");
/* harmony import */ var _components_notifications_PrivateDiscussionUserLeftNotification__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/notifications/PrivateDiscussionUserLeftNotification */ "./src/forum/components/notifications/PrivateDiscussionUserLeftNotification.js");
/* harmony import */ var _components_notifications_PrivateDiscussionAddedNotification__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/notifications/PrivateDiscussionAddedNotification */ "./src/forum/components/notifications/PrivateDiscussionAddedNotification.js");
/* harmony import */ var _components_notifications_PrivateDiscussionMadePublicNotification__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/notifications/PrivateDiscussionMadePublicNotification */ "./src/forum/components/notifications/PrivateDiscussionMadePublicNotification.js");
/* harmony import */ var _components_RecipientsModified__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/RecipientsModified */ "./src/forum/components/RecipientsModified.js");
/* harmony import */ var _components_RecipientLeft__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/RecipientLeft */ "./src/forum/components/RecipientLeft.js");
/* harmony import */ var _addPrivateDiscussionsToSessionDropdown__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./addPrivateDiscussionsToSessionDropdown */ "./src/forum/addPrivateDiscussionsToSessionDropdown.js");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../common/helpers */ "./src/common/helpers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helpers", function() { return _common_helpers__WEBPACK_IMPORTED_MODULE_19__["helpers"]; });

/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components */ "./src/forum/components/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _components__WEBPACK_IMPORTED_MODULE_20__["components"]; });






















app.initializers.add('fof-byobu', function (app) {
  //app.routes['private_discussions'] = { path: '/private-discussions', component: PrivateDiscussionIndex.component() };
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.recipientUsers = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('recipientUsers');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.oldRecipientUsers = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('oldRecipientUsers');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.recipientGroups = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('recipientGroups');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.oldRecipientGroups = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('oldRecipientGroups');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canEditRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canEditRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canEditUserRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canEditUserRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canEditGroupRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canEditGroupRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canEditGroupRecipients = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canEditGroupRecipients');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canMakePublic = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canMakePublic');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.blocksPd = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('blocksPd');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.cannotBeDirectMessaged = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('cannotBeDirectMessaged');
  app.postComponents.recipientsModified = _components_RecipientsModified__WEBPACK_IMPORTED_MODULE_16__["default"];
  app.postComponents.recipientLeft = _components_RecipientLeft__WEBPACK_IMPORTED_MODULE_17__["default"];
  Object(_addRecipientLabels__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_addRecipientsControl__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_addHasRecipientsBadge__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_addPrivacySetting__WEBPACK_IMPORTED_MODULE_8__["default"])();
  Object(_addDiscussPrivatelyControl__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_addPrivateDiscussionsPage__WEBPACK_IMPORTED_MODULE_9__["default"])();
  Object(_addPrivateDiscussionsToSessionDropdown__WEBPACK_IMPORTED_MODULE_18__["default"])();
  app.notificationComponents.byobuPrivateDiscussionCreated = _components_notifications_PrivateDiscussionNotification__WEBPACK_IMPORTED_MODULE_11__["default"];
  app.notificationComponents.byobuPrivateDiscussionReplied = _components_notifications_PrivateDiscussionReplyNotification__WEBPACK_IMPORTED_MODULE_12__["default"];
  app.notificationComponents.byobuRecipientRemoved = _components_notifications_PrivateDiscussionUserLeftNotification__WEBPACK_IMPORTED_MODULE_13__["default"];
  app.notificationComponents.byobuPrivateDiscussionAdded = _components_notifications_PrivateDiscussionAddedNotification__WEBPACK_IMPORTED_MODULE_14__["default"];
  app.notificationComponents.byobuMadePublic = _components_notifications_PrivateDiscussionMadePublicNotification__WEBPACK_IMPORTED_MODULE_15__["default"]; // Add notification preferences.

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_10___default.a.prototype, 'notificationTypes', function (items) {
    items.add('byobuPrivateDiscussionCreated', {
      name: 'byobuPrivateDiscussionCreated',
      icon: 'fas fa-map',
      label: app.translator.trans('fof-byobu.forum.notifications.pd_label')
    });
    items.add('byobuPrivateDiscussionReplied', {
      name: 'byobuPrivateDiscussionReplied',
      icon: 'fas fa-map',
      label: app.translator.trans('fof-byobu.forum.notifications.pd_reply_label')
    });
    items.add('byobuPrivateDiscussionAdded', {
      name: 'byobuPrivateDiscussionAdded',
      icon: 'fas fa-map',
      label: app.translator.trans('fof-byobu.forum.notifications.pd_added_label')
    });
    items.add('byobuRecipientRemoved', {
      name: 'byobuRecipientRemoved',
      icon: 'fas fa-map',
      label: app.translator.trans('fof-byobu.forum.notifications.pd_user_left_label')
    });
    items.add('byobuMadePublic', {
      name: 'byobuMadePublic',
      icon: 'fas fa-map',
      label: app.translator.trans('fof-byobu.forum.notifications.pd_made_public_label')
    });
  });
});

/***/ }),

/***/ "./src/forum/states/PrivateDiscussionListState.js":
/*!********************************************************!*\
  !*** ./src/forum/states/PrivateDiscussionListState.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrivateDiscussionLisState; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/states/DiscussionListState */ "flarum/states/DiscussionListState");
/* harmony import */ var flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_1__);



var PrivateDiscussionLisState = /*#__PURE__*/function (_DiscussionListState) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PrivateDiscussionLisState, _DiscussionListState);

  function PrivateDiscussionLisState() {
    return _DiscussionListState.apply(this, arguments) || this;
  }

  return PrivateDiscussionLisState;
}(flarum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_1___default.a);



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

/***/ "flarum/components/Dropdown":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/Dropdown']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Dropdown'];

/***/ }),

/***/ "flarum/components/EventPost":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/EventPost']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/EventPost'];

/***/ }),

/***/ "flarum/components/IndexPage":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/IndexPage']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/IndexPage'];

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

/***/ "flarum/components/Notification":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/Notification']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Notification'];

/***/ }),

/***/ "flarum/components/NotificationGrid":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/NotificationGrid']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/NotificationGrid'];

/***/ }),

/***/ "flarum/components/Search":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Search']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Search'];

/***/ }),

/***/ "flarum/components/SessionDropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/SessionDropdown']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SessionDropdown'];

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

/***/ "flarum/states/DiscussionListState":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['states/DiscussionListState']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['states/DiscussionListState'];

/***/ }),

/***/ "flarum/states/SearchState":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['states/SearchState']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['states/SearchState'];

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

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/Stream'];

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