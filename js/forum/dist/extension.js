"use strict";

System.register("flagrow/messaging/addMessagingDropdown", ["flarum/extend", "flarum/app", "flarum/components/HeaderSecondary", "flagrow/messaging/components/MessagingDropdown"], function (_export, _context) {
    "use strict";

    var extend, app, HeaderSecondary, MessagingDropdown;

    _export("default", function () {
        extend(HeaderSecondary.prototype, 'items', function (items) {
            if (app.forum.attribute('canMessage')) {
                items.add('messaging', m(MessagingDropdown, null), 15);
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsHeaderSecondary) {
            HeaderSecondary = _flarumComponentsHeaderSecondary.default;
        }, function (_flagrowMessagingComponentsMessagingDropdown) {
            MessagingDropdown = _flagrowMessagingComponentsMessagingDropdown.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/messaging/components/MessageList", ["flarum/Component", "flarum/components/LoadingIndicator", "flarum/helpers/avatar", "flarum/helpers/username", "flarum/helpers/icon", "flarum/helpers/humanTime", "flarum/components/Button", "flagrow/messaging/components/RecipientSelectModal"], function (_export, _context) {
    "use strict";

    var Component, LoadingIndicator, avatar, username, icon, humanTime, Button, RecipientSelectModal, MessageList;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumHelpersHumanTime) {
            humanTime = _flarumHelpersHumanTime.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMessagingComponentsRecipientSelectModal) {
            RecipientSelectModal = _flagrowMessagingComponentsRecipientSelectModal.default;
        }],
        execute: function () {
            MessageList = function (_Component) {
                babelHelpers.inherits(MessageList, _Component);

                function MessageList() {
                    babelHelpers.classCallCheck(this, MessageList);
                    return babelHelpers.possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).apply(this, arguments));
                }

                babelHelpers.createClass(MessageList, [{
                    key: "init",
                    value: function init() {
                        /**
                         * Whether or not the notifications are loading.
                         *
                         * @type {Boolean}
                         */
                        this.loading = false;
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var messages = app.cache.userMessages || [];

                        return m(
                            "div",
                            { className: "NotificationList MessageList" },
                            m(
                                "div",
                                { className: "NotificationList-header" },
                                m(
                                    "div",
                                    { className: "App-primaryControl" },
                                    Button.component({
                                        className: 'Button Button--icon Button--link',
                                        icon: 'pencil-square-o',
                                        title: app.translator.trans('flagrow-messaging.forum.dropdown.write_message'),
                                        onclick: this.popRecipientModal.bind(this)
                                    })
                                ),
                                m(
                                    "h4",
                                    { className: "App-titleControl App-titleControl--text" },
                                    app.translator.trans('flagrow-messaging.forum.dropdown.title')
                                )
                            ),
                            m(
                                "div",
                                { className: "NotificationList-content" },
                                m(
                                    "ul",
                                    { className: "NotificationGroup-content" },
                                    messages.length ? messages.map(function (message) {
                                        var from = message.from();

                                        return m(
                                            "li",
                                            null,
                                            m(
                                                "a",
                                                { className: "Notification Message", config: function config(element, isInitialized) {
                                                        m.route.apply(this, arguments);
                                                    } },
                                                avatar(from.user()),
                                                icon('comments-o', { className: 'Message-icon' }),
                                                m(
                                                    "span",
                                                    { className: "Message-content" },
                                                    app.translator.trans('flagrow-messaging.forum.dropdown.message_received_from', {
                                                        username: username(from()), em: m("em", null)
                                                    })
                                                ),
                                                humanTime(message.sendAt()),
                                                m(
                                                    "div",
                                                    { className: "Message-excerpt" },
                                                    message.contentPlain()
                                                )
                                            )
                                        );
                                    }) : !this.loading ? m(
                                        "div",
                                        { className: "Message-empty" },
                                        m(
                                            "span",
                                            null,
                                            app.translator.trans('flagrow-messaging.forum.dropdown.no_messages')
                                        ),
                                        icon('inbox', { className: 'fa-5x' })
                                    ) : LoadingIndicator.component({ className: 'LoadingIndicator--block' })
                                )
                            )
                        );
                    }
                }, {
                    key: "popRecipientModal",
                    value: function popRecipientModal() {
                        app.modal.show(new RecipientSelectModal());
                    }
                }, {
                    key: "load",
                    value: function load() {
                        var _this2 = this;

                        if (app.cache.messages && !app.session.user.attribute('newMessagesCount')) {
                            return;
                        }

                        this.loading = true;
                        m.redraw();

                        app.store.find('messaging/notifications').then(function (messages) {
                            app.session.user.pushAttributes({ newMessagesCount: 0 });
                            app.cache.messages = messages.sort(function (a, b) {
                                return b.sendAt() - a.sendAt();
                            });
                        }).catch(function () {}).then(function () {
                            _this2.loading = false;
                            m.redraw();
                        });
                    }
                }]);
                return MessageList;
            }(Component);

            _export("default", MessageList);
        }
    };
});;
"use strict";

System.register("flagrow/messaging/components/MessagingDropdown", ["flarum/components/NotificationsDropdown", "flagrow/messaging/components/MessageList"], function (_export, _context) {
    "use strict";

    var NotificationsDropdown, MessageList, MessagingDropdown;
    return {
        setters: [function (_flarumComponentsNotificationsDropdown) {
            NotificationsDropdown = _flarumComponentsNotificationsDropdown.default;
        }, function (_flagrowMessagingComponentsMessageList) {
            MessageList = _flagrowMessagingComponentsMessageList.default;
        }],
        execute: function () {
            MessagingDropdown = function (_NotificationsDropdow) {
                babelHelpers.inherits(MessagingDropdown, _NotificationsDropdow);

                function MessagingDropdown() {
                    babelHelpers.classCallCheck(this, MessagingDropdown);
                    return babelHelpers.possibleConstructorReturn(this, (MessagingDropdown.__proto__ || Object.getPrototypeOf(MessagingDropdown)).apply(this, arguments));
                }

                babelHelpers.createClass(MessagingDropdown, [{
                    key: "init",
                    value: function init() {
                        babelHelpers.get(MessagingDropdown.prototype.__proto__ || Object.getPrototypeOf(MessagingDropdown.prototype), "init", this).call(this);

                        this.list = new MessageList();
                    }
                }, {
                    key: "goToRoute",
                    value: function goToRoute() {
                        m.route(app.route('flagrow.messaging.notifications'));
                    }
                }, {
                    key: "getUnreadCount",
                    value: function getUnreadCount() {
                        return app.cache.userMessages ? app.cache.userMessages.length : app.forum.attribute('flagrow.userMessages');
                    }
                }, {
                    key: "getNewCount",
                    value: function getNewCount() {
                        return app.session.user.attribute('newMessagesCount');
                    }
                }], [{
                    key: "initProps",
                    value: function initProps(props) {
                        props.label = props.label || app.translator.trans('flagrow-messaging.forum.labels.pm_dropdown');
                        props.icon = props.icon || 'inbox';

                        babelHelpers.get(MessagingDropdown.__proto__ || Object.getPrototypeOf(MessagingDropdown), "initProps", this).call(this, props);
                    }
                }]);
                return MessagingDropdown;
            }(NotificationsDropdown);

            _export("default", MessagingDropdown);
        }
    };
});;
'use strict';

System.register('flagrow/messaging/components/RecipientSelectModal', ['flarum/components/Modal', 'flarum/components/Button', 'flagrow/messaging/components/RecipientSearch'], function (_export, _context) {
    "use strict";

    var Modal, Button, RecipientSearch, RecipientSelectModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMessagingComponentsRecipientSearch) {
            RecipientSearch = _flagrowMessagingComponentsRecipientSearch.default;
        }],
        execute: function () {
            RecipientSelectModal = function (_Modal) {
                babelHelpers.inherits(RecipientSelectModal, _Modal);

                function RecipientSelectModal() {
                    babelHelpers.classCallCheck(this, RecipientSelectModal);
                    return babelHelpers.possibleConstructorReturn(this, (RecipientSelectModal.__proto__ || Object.getPrototypeOf(RecipientSelectModal)).apply(this, arguments));
                }

                babelHelpers.createClass(RecipientSelectModal, [{
                    key: 'className',
                    value: function className() {
                        return 'RecipientSelectModal Modal--large';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-messaging.forum.recipient_modal.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form Form--centered' },
                                m(
                                    'p',
                                    { className: 'helpText' },
                                    app.translator.trans('flagrow-messaging.forum.recipient_modal.help')
                                ),
                                RecipientSearch.component(),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    Button.component({
                                        className: 'Button Button--primary Button--block',
                                        type: 'submit',
                                        loading: this.loading,
                                        children: app.translator.trans('flagrow-messaging.forum.recipient_modal.submit')
                                    })
                                )
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        e.preventDefault();

                        this.loading = true;
                    }
                }]);
                return RecipientSelectModal;
            }(Modal);

            _export('default', RecipientSelectModal);
        }
    };
});;
"use strict";

System.register("flagrow/messaging/main", ["flarum/extend", "flagrow/messaging/models/Message", "flagrow/messaging/addMessagingDropdown"], function (_export, _context) {
    "use strict";

    var extend, Message, addMessagingDropdown;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flagrowMessagingModelsMessage) {
            Message = _flagrowMessagingModelsMessage.default;
        }, function (_flagrowMessagingAddMessagingDropdown) {
            addMessagingDropdown = _flagrowMessagingAddMessagingDropdown.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-messaging', function () {
                app.store.models.messages = Message;

                addMessagingDropdown();
            });
        }
    };
});;
'use strict';

System.register('flagrow/messaging/models/Message', ['flarum/Model'], function (_export, _context) {
    "use strict";

    var Model, Message;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }],
        execute: function () {
            Message = function (_Model) {
                babelHelpers.inherits(Message, _Model);

                function Message() {
                    babelHelpers.classCallCheck(this, Message);
                    return babelHelpers.possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
                }

                return Message;
            }(Model);

            babelHelpers.extends(Message.prototype, {
                content: Model.attribute('content'),
                from: Model.hasOne('from'),
                sendAt: Model.attribute('createdAt', Model.transformDate),
                readAt: Model.attribute('readAt', Model.transformDate)
            });

            _export('default', Message);
        }
    };
});;
'use strict';

System.register('flagrow/messaging/components/RecipientSearch', ['flarum/components/Search', 'flarum/components/UsersSearchSource', 'flarum/utils/ItemList', 'flarum/utils/classList', 'flarum/utils/extractText'], function (_export, _context) {
    "use strict";

    var Search, UsersSearchSource, ItemList, classList, extractText, RecipientSearch;
    return {
        setters: [function (_flarumComponentsSearch) {
            Search = _flarumComponentsSearch.default;
        }, function (_flarumComponentsUsersSearchSource) {
            UsersSearchSource = _flarumComponentsUsersSearchSource.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }],
        execute: function () {
            RecipientSearch = function (_Search) {
                babelHelpers.inherits(RecipientSearch, _Search);

                function RecipientSearch() {
                    babelHelpers.classCallCheck(this, RecipientSearch);
                    return babelHelpers.possibleConstructorReturn(this, (RecipientSearch.__proto__ || Object.getPrototypeOf(RecipientSearch)).apply(this, arguments));
                }

                babelHelpers.createClass(RecipientSearch, [{
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        var currentSearch = this.getCurrentSearch();

                        // Initialize search input value in the view rather than the constructor so
                        // that we have access to app.current.
                        if (typeof this.value() === 'undefined') {
                            this.value(currentSearch || '');
                        }

                        return m(
                            'div',
                            { className: 'Search ' + classList({
                                    open: this.value() && this.hasFocus,
                                    focused: this.hasFocus,
                                    active: !!currentSearch,
                                    loading: !!this.loadingSources
                                }) },
                            m(
                                'div',
                                { className: 'Search-input' },
                                m('input', { className: 'FormControl',
                                    type: 'search',
                                    placeholder: extractText(app.translator.trans('flagrow-messaging.forum.recipient_modal.search_placeholder')),
                                    value: this.value(),
                                    oninput: m.withAttr('value', this.value),
                                    onfocus: function onfocus() {
                                        return _this2.hasFocus = true;
                                    },
                                    onblur: function onblur() {
                                        return _this2.hasFocus = false;
                                    } }),
                                this.loadingSources ? LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' }) : currentSearch ? m(
                                    'button',
                                    { className: 'Search-clear Button Button--icon Button--link', onclick: this.clear.bind(this) },
                                    icon('times-circle')
                                ) : ''
                            ),
                            m(
                                'ul',
                                { className: 'Dropdown-menu Search-results' },
                                this.value() && this.hasFocus ? this.sources.map(function (source) {
                                    return source.view(_this2.value());
                                }) : ''
                            )
                        );
                    }
                }, {
                    key: 'sourceItems',
                    value: function sourceItems() {
                        var items = new ItemList();

                        items.add('users', new UsersSearchSource());

                        return items;
                    }
                }, {
                    key: 'selectResult',
                    value: function selectResult() {
                        if (this.value()) {
                            console.log(this.getItem(this.index));
                        } else {
                            this.clear();
                        }

                        this.$('input').blur();
                    }
                }]);
                return RecipientSearch;
            }(Search);

            _export('default', RecipientSearch);
        }
    };
});