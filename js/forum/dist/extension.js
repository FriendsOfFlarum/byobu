'use strict';

System.register('flagrow/messaging/addRecipientComposer', ['flarum/extend', 'flarum/components/DiscussionComposer', 'flagrow/messaging/components/AddRecipientModal', 'flagrow/messaging/helpers/recipientsLabel'], function (_export, _context) {
    "use strict";

    var extend, override, DiscussionComposer, AddRecipientModal, recipientsLabel;

    _export('default', function () {
        // Add recipient-selection abilities to the discussion composer.
        DiscussionComposer.prototype.recipients = [];
        DiscussionComposer.prototype.chooseRecipients = function () {
            var _this = this;

            app.modal.show(new AddRecipientModal({
                selectedRecipients: this.recipients,
                onsubmit: function onsubmit(recipients) {
                    _this.recipients = recipients;
                    _this.$('textarea').focus();
                }
            }));
        };

        // Add a tag-selection menu to the discussion composer's header, after the
        // title.
        extend(DiscussionComposer.prototype, 'headerItems', function (items) {
            items.add('recipients', m(
                'a',
                { className: 'DiscussionComposer-changeRecipients', onclick: this.chooseRecipients.bind(this) },
                this.recipients.length ? recipientsLabel(this.recipients) : m(
                    'span',
                    { className: 'RecipientLabel none' },
                    app.translator.trans('flagrow-messaging.forum.buttons.add_recipients')
                )
            ), 5);
        });

        // Add the selected tags as data to submit to the server.
        extend(DiscussionComposer.prototype, 'data', function (data) {
            data.relationships = data.relationships || {};
            data.relationships.recipients = this.recipients;
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
            override = _flarumExtend.override;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flagrowMessagingComponentsAddRecipientModal) {
            AddRecipientModal = _flagrowMessagingComponentsAddRecipientModal.default;
        }, function (_flagrowMessagingHelpersRecipientsLabel) {
            recipientsLabel = _flagrowMessagingHelpersRecipientsLabel.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/messaging/components/AddRecipientModal', ['flarum/components/Modal', 'flarum/components/DiscussionPage', 'flarum/components/Button', 'flarum/utils/ItemList', 'flagrow/messaging/components/RecipientSearch'], function (_export, _context) {
    "use strict";

    var Modal, DiscussionPage, Button, ItemList, RecipientSearch, AddRecipientModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flagrowMessagingComponentsRecipientSearch) {
            RecipientSearch = _flagrowMessagingComponentsRecipientSearch.default;
        }],
        execute: function () {
            AddRecipientModal = function (_Modal) {
                babelHelpers.inherits(AddRecipientModal, _Modal);

                function AddRecipientModal() {
                    babelHelpers.classCallCheck(this, AddRecipientModal);
                    return babelHelpers.possibleConstructorReturn(this, (AddRecipientModal.__proto__ || Object.getPrototypeOf(AddRecipientModal)).apply(this, arguments));
                }

                babelHelpers.createClass(AddRecipientModal, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(AddRecipientModal.prototype.__proto__ || Object.getPrototypeOf(AddRecipientModal.prototype), 'init', this).call(this);

                        this.selected = m.prop(new ItemList());

                        if (this.props.selectedRecipients) {
                            this.props.selectedRecipients.map(function (recipient) {
                                _this2.selected().add(recipient.id, recipient);
                            });
                        } else if (this.props.discussion) {
                            this.props.discussion.recipients().map(function (recipient) {
                                _this2.selected().add(recipient.id, recipient);
                            });
                        }

                        this.recipientSearch = RecipientSearch.component({
                            selected: this.selected
                        });
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'AddRecipientModal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return this.props.discussion ? app.translator.trans('flagrow-messaging.forum.modal.titles.update_recipients', { title: m(
                                'em',
                                null,
                                this.props.discussion.title()
                            ) }) : app.translator.trans('flagrow-messaging.forum.modal.titles.add_recipients');
                    }
                }, {
                    key: 'content',
                    value: function content() {

                        return [m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'AddRecipientModal-form' },
                                this.recipientSearch,
                                m(
                                    'div',
                                    { className: 'AddRecipientModal-form-submit App-primaryControl' },
                                    Button.component({
                                        type: 'submit',
                                        className: 'Button Button--primary',
                                        disabled: false,
                                        icon: 'check',
                                        children: app.translator.trans('flagrow-messaging.forum.buttons.submit')
                                    })
                                )
                            )
                        )];
                    }
                }, {
                    key: 'select',
                    value: function select(e) {
                        // Ctrl + Enter submits the selection, just Enter completes the current entry
                        if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
                            if (this.selected.length) {
                                this.$('form').submit();
                            }
                        }
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        e.preventDefault();

                        var discussion = this.props.discussion;
                        var recipients = this.selected().toArray();

                        if (discussion) {
                            discussion.save({ relationships: { recipients: recipients } }).then(function () {
                                if (app.current instanceof DiscussionPage) {
                                    app.current.stream.update();
                                }
                                m.redraw();
                            });
                        }

                        if (this.props.onsubmit) this.props.onsubmit(recipients);

                        app.modal.close();

                        m.redraw.strategy('none');
                    }
                }]);
                return AddRecipientModal;
            }(Modal);

            _export('default', AddRecipientModal);
        }
    };
});;
"use strict";

System.register("flagrow/messaging/components/RecipientSearch", ["flarum/components/Search", "flagrow/messaging/components/RecipientSearchSource", "flarum/utils/ItemList", "flarum/utils/classList", "flarum/utils/extractText", "flarum/components/LoadingIndicator", "flagrow/messaging/helpers/recipientLabel", "flarum/helpers/icon"], function (_export, _context) {
    "use strict";

    var Search, RecipientSearchSource, ItemList, classList, extractText, LoadingIndicator, recipientLabel, icon, RecipientSearch;
    return {
        setters: [function (_flarumComponentsSearch) {
            Search = _flarumComponentsSearch.default;
        }, function (_flagrowMessagingComponentsRecipientSearchSource) {
            RecipientSearchSource = _flagrowMessagingComponentsRecipientSearchSource.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flagrowMessagingHelpersRecipientLabel) {
            recipientLabel = _flagrowMessagingHelpersRecipientLabel.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            RecipientSearch = function (_Search) {
                babelHelpers.inherits(RecipientSearch, _Search);

                function RecipientSearch() {
                    babelHelpers.classCallCheck(this, RecipientSearch);
                    return babelHelpers.possibleConstructorReturn(this, (RecipientSearch.__proto__ || Object.getPrototypeOf(RecipientSearch)).apply(this, arguments));
                }

                babelHelpers.createClass(RecipientSearch, [{
                    key: "init",
                    value: function init() {
                        babelHelpers.get(RecipientSearch.prototype.__proto__ || Object.getPrototypeOf(RecipientSearch.prototype), "init", this).call(this);

                        console.log(this.props);
                    }
                }, {
                    key: "config",
                    value: function config(isInitialized) {
                        var _this2 = this;

                        if (isInitialized) return;

                        var $search = this;

                        this.$('.Search-results').on('click', function (e) {
                            var target = _this2.$('.UserSearchResult.active');

                            $search.addRecipient(target.data('index'));
                        });

                        babelHelpers.get(RecipientSearch.prototype.__proto__ || Object.getPrototypeOf(RecipientSearch.prototype), "config", this).call(this, isInitialized);
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this3 = this;

                        if (typeof this.value() === 'undefined') {
                            this.value('');
                        }
                        return m(
                            "div",
                            { className: "AddRecipientModal-form-input" },
                            m(
                                "div",
                                { className: "RecipientsInput-selected" },
                                this.props.selected().toArray().map(function (recipient) {
                                    return m(
                                        "span",
                                        { className: "RecipientsInput-tag", onclick: function onclick() {
                                                _this3.removeRecipient(recipient);
                                            } },
                                        recipientLabel(recipient)
                                    );
                                })
                            ),
                            m("input", { className: 'RecipientsInput FormControl ' + classList({
                                    open: !!this.value(),
                                    focused: !!this.value(),
                                    active: !!this.value(),
                                    loading: !!this.loadingSources
                                }),
                                type: "search",
                                placeholder: extractText(app.translator.trans('flagrow-messaging.forum.input.search_recipients')),
                                value: this.value(),
                                oninput: m.withAttr('value', this.value),
                                onfocus: function onfocus() {
                                    return _this3.hasFocus = true;
                                },
                                onblur: function onblur() {
                                    return _this3.hasFocus = false;
                                } }),
                            this.loadingSources ? LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' }) : this.value() ? m(
                                "button",
                                { className: "Search-clear Button Button--icon Button--link",
                                    onclick: this.clear.bind(this) },
                                icon('times-circle')
                            ) : '',
                            m(
                                "ul",
                                { className: "Dropdown-menu Search-results" },
                                this.value() && this.hasFocus ? this.sources.map(function (source) {
                                    return source.view(_this3.value());
                                }) : ''
                            )
                        );
                    }
                }, {
                    key: "sourceItems",
                    value: function sourceItems() {
                        var items = new ItemList();

                        items.add('recipients', new RecipientSearchSource());

                        return items;
                    }
                }, {
                    key: "selectResult",
                    value: function selectResult() {
                        console.log({
                            selectResult: true,
                            value: this.value()
                        });
                        if (this.value()) {
                            this.addRecipient(this.getItem(this.index));
                        }
                    }
                }, {
                    key: "clear",
                    value: function clear() {
                        this.value('');

                        m.redraw();
                    }
                }, {
                    key: "addRecipient",
                    value: function addRecipient(id) {
                        var recipient = this.findRecipient(id);

                        this.props.selected().add(id, recipient);

                        m.redraw();
                    }
                }, {
                    key: "removeRecipient",
                    value: function removeRecipient(recipient) {
                        this.props.selected().remove(recipient.id());

                        m.redraw();
                    }
                }, {
                    key: "findRecipient",
                    value: function findRecipient(id) {
                        return app.store.getById('users', id);
                    }
                }]);
                return RecipientSearch;
            }(Search);

            _export("default", RecipientSearch);
        }
    };
});;
'use strict';

System.register('flagrow/messaging/components/RecipientSearchSource', ['flarum/helpers/highlight', 'flarum/helpers/avatar', 'flarum/helpers/username'], function (_export, _context) {
    "use strict";

    var highlight, avatar, username, RecipientSearchSource;
    return {
        setters: [function (_flarumHelpersHighlight) {
            highlight = _flarumHelpersHighlight.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }],
        execute: function () {
            RecipientSearchSource = function () {
                function RecipientSearchSource() {
                    babelHelpers.classCallCheck(this, RecipientSearchSource);
                }

                babelHelpers.createClass(RecipientSearchSource, [{
                    key: 'search',
                    value: function search(query) {
                        return app.store.find('users', {
                            filter: { q: query },
                            page: { limit: 5 }
                        });
                    }
                }, {
                    key: 'view',
                    value: function view(query) {
                        query = query.toLowerCase();

                        var results = app.store.all('users').filter(function (user) {
                            return user.username().toLowerCase().substr(0, query.length) === query;
                        });

                        if (!results.length) return '';

                        return [m(
                            'li',
                            { className: 'Dropdown-header' },
                            app.translator.trans('core.forum.search.users_heading')
                        ), results.map(function (user) {
                            var name = username(user);
                            name.children[0] = highlight(name.children[0], query);

                            return m(
                                'li',
                                { className: 'UserSearchResult', 'data-index': user.id() },
                                m(
                                    'a',
                                    null,
                                    avatar(user),
                                    name
                                )
                            );
                        })];
                    }
                }]);
                return RecipientSearchSource;
            }();

            _export('default', RecipientSearchSource);
        }
    };
});;
'use strict';

System.register('flagrow/messaging/helpers/recipientLabel', ['flarum/utils/extract', 'flarum/helpers/username'], function (_export, _context) {
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
      user ? username(user) : app.translator.trans('flagrow-messaging.forum.labels.lib.user_deleted')
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

System.register('flagrow/messaging/helpers/recipientsLabel', ['flarum/utils/extract', 'flagrow/messaging/helpers/recipientLabel'], function (_export, _context) {
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
    }, function (_flagrowMessagingHelpersRecipientLabel) {
      recipientLabel = _flagrowMessagingHelpersRecipientLabel.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flagrow/messaging/main', ['flarum/Model', 'flarum/models/Discussion', 'flagrow/messaging/addRecipientComposer', 'flagrow/messaging/addRecipientLabels'], function (_export, _context) {
    "use strict";

    var Model, Discussion, addRecipientComposer, addRecipientLabels;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flagrowMessagingAddRecipientComposer) {
            addRecipientComposer = _flagrowMessagingAddRecipientComposer.default;
        }, function (_flagrowMessagingAddRecipientLabels) {
            addRecipientLabels = _flagrowMessagingAddRecipientLabels.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-messaging', function (app) {
                Discussion.prototype.recipients = Model.hasMany('recipients');

                addRecipientComposer();
                addRecipientLabels();
            });
        }
    };
});;
'use strict';

System.register('flagrow/messaging/addRecipientLabels', ['flarum/extend', 'flarum/components/DiscussionListItem', 'flarum/components/DiscussionPage', 'flarum/components/DiscussionHero', 'flagrow/messaging/helpers/recipientsLabel'], function (_export, _context) {
    "use strict";

    var extend, DiscussionListItem, DiscussionPage, DiscussionHero, recipientsLabel;

    _export('default', function () {

        extend(DiscussionListItem.prototype, 'infoItems', function (items) {
            var recipients = this.props.discussion.recipients();

            if (recipients && recipients.length) {
                items.add('recipients', recipientsLabel(recipients), 20);
            }
        });

        extend(DiscussionPage.prototype, 'params', function (params) {
            params.include.push('recipients');
        });

        extend(DiscussionHero.prototype, 'items', function (items) {
            var recipients = this.props.discussion.recipients();

            if (recipients && recipients.length) {
                items.add('recipients', recipientsLabel(recipients, { link: true }), 4);
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero.default;
        }, function (_flagrowMessagingHelpersRecipientsLabel) {
            recipientsLabel = _flagrowMessagingHelpersRecipientsLabel.default;
        }],
        execute: function () {}
    };
});