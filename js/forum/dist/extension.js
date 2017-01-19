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

System.register("flagrow/messaging/components/MessageList", ["flarum/Component", "flarum/components/LoadingIndicator", "flarum/helpers/avatar", "flarum/helpers/username", "flarum/helpers/icon", "flarum/helpers/humanTime", "flarum/components/Button"], function (_export, _context) {
    "use strict";

    var Component, LoadingIndicator, avatar, username, icon, humanTime, Button, MessageList;
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
                                        title: app.translator.trans('flagrow-messaging.forum.dropdown.write_message')
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
});