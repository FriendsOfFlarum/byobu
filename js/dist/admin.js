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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./src/admin/addPrivateDiscussionPermission.js":
/*!*****************************************************!*\
  !*** ./src/admin/addPrivateDiscussionPermission.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (app) {
  app.extensionData["for"]('fof-byobu').registerPermission({
    icon: 'far fa-map',
    label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_users'),
    permission: 'discussion.startPrivateDiscussionWithUsers'
  }, 'start', 95).registerPermission({
    icon: 'far fa-map',
    label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_groups'),
    permission: 'discussion.startPrivateDiscussionWithGroups'
  }, 'start', 95).registerPermission({
    icon: 'far fa-map',
    label: app.translator.trans('fof-byobu.admin.permission.create_private_discussions_with_blocking_users'),
    permission: 'startPrivateDiscussionWithBlockers'
  }, 'start', 95).registerPermission({
    icon: 'far fa-map',
    label: app.translator.trans('fof-byobu.admin.permission.edit_user_recipients'),
    permission: 'discussion.editUserRecipients'
  }, 'moderate', 95).registerPermission({
    icon: 'far fa-map',
    label: app.translator.trans('fof-byobu.admin.permission.edit_group_recipients'),
    permission: 'discussion.editGroupRecipients'
  }, 'moderate', 95).registerPermission({
    icon: 'fas fa-flag',
    label: app.translator.trans('fof-byobu.admin.permission.view_private_discussions-when-flagged'),
    permission: 'user.viewPrivateDiscussionsWhenFlagged'
  }, 'moderate', 95);
});

/***/ }),

/***/ "./src/admin/components/ByobuSettingsPage.js":
/*!***************************************************!*\
  !*** ./src/admin/components/ByobuSettingsPage.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ByobuSetingsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/ExtensionPage */ "flarum/components/ExtensionPage");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Badge */ "flarum/components/Badge");
/* harmony import */ var flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fof_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fof-components */ "@fof-components");
/* harmony import */ var _fof_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fof_components__WEBPACK_IMPORTED_MODULE_4__);





var _settings$items = _fof_components__WEBPACK_IMPORTED_MODULE_4__["settings"].items,
    BooleanItem = _settings$items.BooleanItem,
    SelectItem = _settings$items.SelectItem,
    StringItem = _settings$items.StringItem,
    NumberItem = _settings$items.NumberItem;

var ByobuSetingsPage = /*#__PURE__*/function (_ExtensionPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ByobuSetingsPage, _ExtensionPage);

  function ByobuSetingsPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }

  var _proto = ByobuSetingsPage.prototype;

  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);

    this.setting = this.setting.bind(this);
    this.badgeDefault = 'fas fa-map';
    this.postActionDefault = 'far fa-map';
  };

  _proto.content = function content() {
    return [m("div", {
      className: "container"
    }, m("div", {
      className: "ByobuSettingsPage"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('fof-byobu.admin.settings.badge-icon')), m(StringItem, {
      name: "fof-byobu.icon-badge",
      placeholder: this.badgeDefault,
      setting: this.setting
    }, m(flarum_components_Badge__WEBPACK_IMPORTED_MODULE_2___default.a, {
      icon: this.setting('fof-byobu.icon-badge').toJSON() || this.badgeDefault
    }))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('fof-byobu.admin.settings.post-event-icon')), m(StringItem, {
      name: "fof-byobu.icon-postAction",
      placeholder: this.postActionDefault,
      setting: this.setting
    }, m("h2", null, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()(this.setting('fof-byobu.icon-postAction').toJSON() || this.postActionDefault)))), m("p", null, app.translator.trans('flarum-tags.admin.edit_tag.icon_text', {
      a: m("a", {
        href: "https://fontawesome.com/icons?m=free",
        tabindex: "-1"
      })
    })), m("div", {
      className: "Form-group"
    }, this.submitButton())))];
  };

  return ByobuSetingsPage;
}(flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_core_models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/core/models/User */ "flarum/core/models/User");
/* harmony import */ var flarum_core_models_User__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_core_models_User__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _addPrivateDiscussionPermission__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addPrivateDiscussionPermission */ "./src/admin/addPrivateDiscussionPermission.js");
/* harmony import */ var _components_ByobuSettingsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ByobuSettingsPage */ "./src/admin/components/ByobuSettingsPage.js");



app.initializers.add('fof-byobu', function (app) {
  app.store.models.recipients = flarum_core_models_User__WEBPACK_IMPORTED_MODULE_0___default.a;
  app.extensionData["for"]('fof-byobu').registerPage(_components_ByobuSettingsPage__WEBPACK_IMPORTED_MODULE_2__["default"]);
  Object(_addPrivateDiscussionPermission__WEBPACK_IMPORTED_MODULE_1__["default"])(app);
});

/***/ }),

/***/ "@fof-components":
/*!******************************************************!*\
  !*** external "flarum.extensions['fof-components']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.extensions['fof-components'];

/***/ }),

/***/ "flarum/components/Badge":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Badge']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Badge'];

/***/ }),

/***/ "flarum/components/ExtensionPage":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/ExtensionPage']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/ExtensionPage'];

/***/ }),

/***/ "flarum/core/models/User":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['core/models/User']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['core/models/User'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map