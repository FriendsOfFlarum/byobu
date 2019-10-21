<<<<<<< HEAD
module.exports=function(t){var e={};function s(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,s),i.l=!0,i.exports}return s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=47)}({0:function(t,e){t.exports=flarum.core.compat.extend},10:function(t,e){t.exports=flarum.core.compat["components/Switch"]},11:function(t,e){t.exports=flarum.core.compat["components/Select"]},21:function(t,e){t.exports=flarum.core.compat["components/PermissionGrid"]},23:function(t,e,s){"use strict";var r=s(43),i=s.n(r),n=s(0),o=s(21),a=s.n(o),p=function(){Object(n.extend)(a.a.prototype,"startItems",function(t){t.add("startPrivateUsers",{icon:"far fa-map",label:app.translator.trans("fof-byobu.admin.permission.create_private_discussions_with_users"),permission:"discussion.startPrivateDiscussionWithUsers"},95),t.add("startPrivateGroups",{icon:"far fa-map",label:app.translator.trans("fof-byobu.admin.permission.create_private_discussions_with_groups"),permission:"discussion.startPrivateDiscussionWithGroups"},95),t.add("startPrivateBlockers",{icon:"far fa-map",label:app.translator.trans("fof-byobu.admin.permission.create_private_discussions_with_blocking_users"),permission:"startPrivateDiscussionWithBlockers"},95)}),Object(n.extend)(a.a.prototype,"moderateItems",function(t){t.add("editUserRecipients",{icon:"far fa-map",label:app.translator.trans("fof-byobu.admin.permission.edit_user_recipients"),permission:"discussion.editUserRecipients"},95),t.add("editGroupRecipients",{icon:"far fa-map",label:app.translator.trans("fof-byobu.admin.permission.edit_group_recipients"),permission:"discussion.editGroupRecipients"},95)})},c=s(44),u=s.n(c),l=s(10),d=s.n(l),f=s(45),b=s.n(f);class h extends b.a{init(){this.key=this.props.key,this.cast=this.props.cast||(t=>t)}setting(){return app.modal.component.setting(this.key)}getValue(){return this.cast(this.setting()())}}class y extends h{view(){return d.a.component({state:!!Number(this.getValue()),children:this.props.label||this.props.children,onchange:this.setting()})}}class g extends h{view(){const t=Object.assign({},this.props),e=this.props.label||this.props.children;return t.className="FormControl "+(t.className||""),t.bidi=this.setting(),t.simple?m("input",t):m("div.Form-group",[m("label",e),m("input",t)])}}class v extends g{init(){g.prototype.init.call(this),this.cast=(t=>Number(t)),this.props.type="number"}}s(11);const _={boolean:y,string:g,integer:v,number:v};var x=function(){app.extensionSettings["fof-byobu"]=function(){return app.modal.show(new class extends u.a{init(){this.props.items=Array.from(this.props.items||[]),this.settings={},this.setting=this.setting.bind(this),this.props.onsaved&&(this.onsaved=this.props.onsaved.bind(this))}className(){return[this.props.className,this.props.size&&`Modal--${this.props.size}`].filter(Boolean).join(" ")}title(){return this.props.title}form(){return this.props.form||[...this.props.items].map(t=>!t||"div"===t.tag||t.attrs&&t.attrs.className&&t.attrs.className.contains("Form-group")?t:m("div.Form-group",t))}static createItemsFromValidationRules(t,e,s){const r=[];for(const i in t){const n=e+i.toLowerCase(),o=t[i].split("|"),a=o.find(t=>_[t])||"string",p=a&&_[a]||g,c=o.includes("required"),u=s&&(app.translator.trans[`${s}${i.toLowerCase()}-label`]||i)||i,l=app.translator.translations[`${s}${i.toLowerCase()}-description`];r.push(m.prop(`div.Form-group${c?".required":""}`,["boolean"!==a&&m("label",u),p.component({type:a,key:n,required:c,children:u,simple:!0}),l&&m("span",l)]))}return r}}({title:"Byōbu",size:"medium",items:[m(y,{key:"fof-byobu.enable_byobu_user_page"},app.translator.trans("fof-byobu.admin.settings.byobu_users_page_label"))]}))}};app.initializers.add("fof-byobu",function(t){t.store.models.recipients=i.a,p(),x()})},43:function(t,e){t.exports=flarum.core.compat["core/models/User"]},44:function(t,e){t.exports=flarum.core.compat["components/SettingsModal"]},45:function(t,e){t.exports=flarum.core.compat.Component},47:function(t,e,s){"use strict";s.r(e);var r=s(9);for(var i in r)"default"!==i&&function(t){s.d(e,t,function(){return r[t]})}(i);s(23)},9:function(t,e){}});
=======
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
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_common__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/SettingsModal.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/SettingsModal.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingsModal; });
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/items */ "./node_modules/@fof/components/admin/settings/items/index.js");



class SettingsModal extends flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_0___default.a {
    init() {
        this.props.items = Array.from(this.props.items || []);
        this.settings = {};
        this.setting = this.setting.bind(this);

        if (this.props.onsaved) this.onsaved = this.props.onsaved.bind(this);
    }

    className() {
        return [
            this.props.className,
            this.props.size && `Modal--${this.props.size}`,
        ]
            .filter(Boolean)
            .join(' ');
    }

    title() {
        return this.props.title;
    }

    form() {
        return (
            this.props.form ||
            [...this.props.items].map(
                c =>
                    c &&
                    c.tag !== 'div' &&
                    (!c.attrs ||
                        !c.attrs.className ||
                        !c.attrs.className.contains('Form-group'))
                        ? m('div.Form-group', c)
                        : c
            )
        );
    }

    static createItemsFromValidationRules(
        rules,
        settingsPrefix,
        translationsPrefix
    ) {
        const items = [];

        for (const key in rules) {
            const fullKey = settingsPrefix + key.toLowerCase();
            const rulez = rules[key].split('|');
            const type = rulez.find(t => _settings_items__WEBPACK_IMPORTED_MODULE_1__["types"][t]) || 'string';
            const item = (type && _settings_items__WEBPACK_IMPORTED_MODULE_1__["types"][type]) || _settings_items__WEBPACK_IMPORTED_MODULE_1__["StringItem"];

            const isRequired = rulez.includes('required');
            const label =
                (translationsPrefix &&
                    (app.translator.trans[
                        `${translationsPrefix}${key.toLowerCase()}-label`
                    ] ||
                        key)) ||
                key;
            const description =
                app.translator.translations[
                    `${translationsPrefix}${key.toLowerCase()}-description`
                ];

            items.push(
                m.prop(`div.Form-group${isRequired ? '.required' : ''}`, [
                    type !== 'boolean' && m('label', label),
                    item.component({
                        type,
                        key: fullKey,
                        required: isRequired,
                        children: label,
                        simple: true,
                    }),
                    description && m('span', description),
                ])
            );
        }

        return items;
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/BooleanItem.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/BooleanItem.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BooleanItem; });
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingItem */ "./node_modules/@fof/components/admin/settings/items/SettingItem.js");



class BooleanItem extends _SettingItem__WEBPACK_IMPORTED_MODULE_1__["default"] {
    view() {
        return flarum_components_Switch__WEBPACK_IMPORTED_MODULE_0___default.a.component({
            state: !!Number(this.getValue()),
            children: this.props.label || this.props.children,
            onchange: this.setting(),
        });
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/NumberItem.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/NumberItem.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IntegerItem; });
/* harmony import */ var _StringItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringItem */ "./node_modules/@fof/components/admin/settings/items/StringItem.js");


class IntegerItem extends _StringItem__WEBPACK_IMPORTED_MODULE_0__["default"] {
    init() {
        _StringItem__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.init.call(this);

        this.cast = a => Number(a);
        this.props.type = 'number';
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/SelectItem.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/SelectItem.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectItem; });
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingItem */ "./node_modules/@fof/components/admin/settings/items/SettingItem.js");



class SelectItem extends _SettingItem__WEBPACK_IMPORTED_MODULE_1__["default"] {
    view() {
        return flarum_components_Select__WEBPACK_IMPORTED_MODULE_0___default.a.component({
            options: this.props.options,
            value: this.getValue() || this.props.default,
            onchange: this.setting(),
        });
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/SettingItem.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/SettingItem.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingItem; });
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_0__);


class SettingItem extends flarum_Component__WEBPACK_IMPORTED_MODULE_0___default.a {
    init() {
        this.key = this.props.key;
        this.cast = this.props.cast || (a => a);
    }

    setting() {
        return app.modal.component.setting(this.key);
    }

    getValue() {
        return this.cast(this.setting()());
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/StringItem.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/StringItem.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringItem; });
/* harmony import */ var _SettingItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingItem */ "./node_modules/@fof/components/admin/settings/items/SettingItem.js");


class StringItem extends _SettingItem__WEBPACK_IMPORTED_MODULE_0__["default"] {
    view() {
        const attrs = Object.assign({}, this.props);
        const label = this.props.label || this.props.children;

        attrs.className = 'FormControl ' + (attrs.className || '');
        attrs.bidi = this.setting();

        return attrs.simple
            ? m('input', attrs)
            : m('div.Form-group', [m('label', label), m('input', attrs)]);
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/index.js ***!
  \********************************************************************/
/*! exports provided: BooleanItem, StringItem, NumberItem, SettingItem, SelectItem, types */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "types", function() { return types; });
/* harmony import */ var _BooleanItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BooleanItem */ "./node_modules/@fof/components/admin/settings/items/BooleanItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanItem", function() { return _BooleanItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _StringItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StringItem */ "./node_modules/@fof/components/admin/settings/items/StringItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StringItem", function() { return _StringItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _NumberItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NumberItem */ "./node_modules/@fof/components/admin/settings/items/NumberItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberItem", function() { return _NumberItem__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _SettingItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingItem */ "./node_modules/@fof/components/admin/settings/items/SettingItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SettingItem", function() { return _SettingItem__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _SelectItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectItem */ "./node_modules/@fof/components/admin/settings/items/SelectItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectItem", function() { return _SelectItem__WEBPACK_IMPORTED_MODULE_4__["default"]; });









const types = {
    boolean: _BooleanItem__WEBPACK_IMPORTED_MODULE_0__["default"],
    string: _StringItem__WEBPACK_IMPORTED_MODULE_1__["default"],
    integer: _NumberItem__WEBPACK_IMPORTED_MODULE_2__["default"],
    number: _NumberItem__WEBPACK_IMPORTED_MODULE_2__["default"],
};


/***/ }),

/***/ "./src/admin/addPrivateDiscussionPermission.js":
/*!*****************************************************!*\
  !*** ./src/admin/addPrivateDiscussionPermission.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'startItems', function (items) {
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
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'moderateItems', function (items) {
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
  });
});

/***/ }),

/***/ "./src/admin/addSettingsModal.js":
/*!***************************************!*\
  !*** ./src/admin/addSettingsModal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fof_components_admin_settings_SettingsModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fof/components/admin/settings/SettingsModal */ "./node_modules/@fof/components/admin/settings/SettingsModal.js");
/* harmony import */ var _fof_components_admin_settings_items_BooleanItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fof/components/admin/settings/items/BooleanItem */ "./node_modules/@fof/components/admin/settings/items/BooleanItem.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  app.extensionSettings['fof-byobu'] = function () {
    return app.modal.show(new _fof_components_admin_settings_SettingsModal__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Byōbu',
      size: 'medium',
      items: [m(_fof_components_admin_settings_items_BooleanItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: "fof-byobu.enable_byobu_user_page"
      }, app.translator.trans('fof-byobu.admin.settings.byobu_users_page_label'))]
    }));
  };
});

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
/* harmony import */ var _addSettingsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addSettingsModal */ "./src/admin/addSettingsModal.js");



app.initializers.add('fof-byobu', function (app) {
  app.store.models.recipients = flarum_core_models_User__WEBPACK_IMPORTED_MODULE_0___default.a;
  Object(_addPrivateDiscussionPermission__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_addSettingsModal__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/core/models/User":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['core/models/User']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['core/models/User'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
>>>>>>> parent of df754be... Build JS
//# sourceMappingURL=admin.js.map