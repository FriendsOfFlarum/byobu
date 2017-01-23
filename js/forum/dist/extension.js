'use strict';

System.register('flagrow/messaging/addRecipientComposer', ['flarum/extend', 'flarum/components/IndexPage', 'flarum/components/DiscussionComposer', 'flagrow/messaging/components/AddRecipientModal', 'flagrow/messaging/helpers/recipientsLabel'], function (_export, _context) {
    "use strict";

    var extend, override, IndexPage, DiscussionComposer, AddRecipientModal, recipientsLabel;

    _export('default', function () {
        extend(IndexPage.prototype, 'composeNewDiscussion', function (promise) {
            // const tag = app.store.getBy('tags', 'slug', this.params().tags);

            // if (tag) {
            //     const parent = tag.parent();
            //     const tags = parent ? [parent, tag] : [tag];
            //     promise.then(component => component.tags = tags);
            // }
        });

        // Add tag-selection abilities to the discussion composer.
        DiscussionComposer.prototype.recipients = [];
        DiscussionComposer.prototype.chooseRecipients = function () {
            var _this = this;

            app.modal.show(new AddRecipientModal({
                selectedRecipients: this.recipients.slice(0),
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

        override(DiscussionComposer.prototype, 'onsubmit', function (original) {
            if (!this.recipients.length) {
                app.modal.show();
            } else {
                original();
            }
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
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
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

System.register('flagrow/messaging/components/AddRecipientModal', ['flarum/components/Modal', 'flarum/components/DiscussionPage', 'flarum/components/Button', 'flarum/helpers/highlight', 'flarum/utils/classList', 'flarum/utils/KeyboardNavigatable', 'flagrow/messaging/components/RecipientSearch', 'flagrow/messaging/helpers/recipientLabel'], function (_export, _context) {
    "use strict";

    var Modal, DiscussionPage, Button, highlight, classList, KeyboardNavigatable, RecipientSearch, recipientLabel, AddRecipientModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumHelpersHighlight) {
            highlight = _flarumHelpersHighlight.default;
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList.default;
        }, function (_flarumUtilsKeyboardNavigatable) {
            KeyboardNavigatable = _flarumUtilsKeyboardNavigatable.default;
        }, function (_flagrowMessagingComponentsRecipientSearch) {
            RecipientSearch = _flagrowMessagingComponentsRecipientSearch.default;
        }, function (_flagrowMessagingHelpersRecipientLabel) {
            recipientLabel = _flagrowMessagingHelpersRecipientLabel.default;
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

                        this.selected = [];
                        this.filter = m.prop('');
                        this.index = null;
                        this.focused = false;
                        this.recipients = [];

                        if (this.props.selectedRecipients) {
                            this.props.selectedRecipients.map(this.addRecipient.bind(this));
                        } else if (this.props.discussion) {
                            this.props.discussion.recipients().map(this.addRecipient.bind(this));
                        }

                        this.navigator = new KeyboardNavigatable();
                        this.navigator.onUp(function () {
                            return _this2.setIndex(_this2.getCurrentNumericIndex() - 1, true);
                        }).onDown(function () {
                            return _this2.setIndex(_this2.getCurrentNumericIndex() + 1, true);
                        }).onSelect(this.select.bind(this)).onRemove(function () {
                            return _this2.selected.splice(_this2.selected.length - 1, 1);
                        });
                    }
                }, {
                    key: 'addRecipient',
                    value: function addRecipient(recipient) {
                        console.log(recipient);
                        this.selected.push(recipient);
                    }
                }, {
                    key: 'removeRecipient',
                    value: function removeRecipient(recipient) {
                        console.log(recipient);
                        var index = this.selected.indexOf(recipient);
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
                        var recipients = this.recipients;
                        var filter = this.filter().toLowerCase();

                        // Filter out all child tags whose parents have not been selected. This
                        // makes it impossible to select a child if its parent hasn't been selected.
                        // tags = tags.filter(tag => {
                        //     const parent = tag.parent();
                        //     return parent === false || this.selected.indexOf(parent) !== -1;
                        // });


                        // If the user has entered text in the filter input, then filter by tags
                        // whose name matches what they've entered.
                        if (filter) {
                            recipients = recipients.filter(function (recipient) {
                                return recipient.name().substr(0, filter.length).toLowerCase() === filter;
                            });
                        }

                        if (recipients.indexOf(this.index) === -1) this.index = recipients[0];

                        return [m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'AddRecipientModal-form' },
                                RecipientSearch.component(),
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
                    key: 'toggleRecipient',
                    value: function toggleRecipient(recipient) {
                        var index = this.selected.indexOf(recipient);

                        if (index !== -1) {
                            this.removeRecipient(recipient);
                        } else {
                            this.addRecipient(recipient);
                        }

                        if (this.filter()) {
                            this.filter('');
                            this.index = this.recipients[0];
                        }

                        this.onready();
                    }
                }, {
                    key: 'select',
                    value: function select(e) {
                        // Ctrl + Enter submits the selection, just Enter completes the current entry
                        if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
                            if (this.selected.length) {
                                this.$('form').submit();
                            }
                        } else {
                            this.getItem(this.index)[0].dispatchEvent(new Event('click'));
                        }
                    }
                }, {
                    key: 'selectableItems',
                    value: function selectableItems() {
                        return this.$('.AddRecipientModal-list > li');
                    }
                }, {
                    key: 'getCurrentNumericIndex',
                    value: function getCurrentNumericIndex() {
                        return this.selectableItems().index(this.getItem(this.index));
                    }
                }, {
                    key: 'getItem',
                    value: function getItem(index) {
                        return this.selectableItems().filter('[data-index="' + index.id() + '"]');
                    }
                }, {
                    key: 'setIndex',
                    value: function setIndex(index, scrollToItem) {
                        var $items = this.selectableItems();
                        var $dropdown = $items.parent();

                        if (index < 0) {
                            index = $items.length - 1;
                        } else if (index >= $items.length) {
                            index = 0;
                        }

                        var $item = $items.eq(index);

                        this.index = app.store.getById('tags', $item.attr('data-index'));

                        m.redraw();

                        if (scrollToItem) {
                            var dropdownScroll = $dropdown.scrollTop();
                            var dropdownTop = $dropdown.offset().top;
                            var dropdownBottom = dropdownTop + $dropdown.outerHeight();
                            var itemTop = $item.offset().top;
                            var itemBottom = itemTop + $item.outerHeight();

                            var scrollTop = void 0;
                            if (itemTop < dropdownTop) {
                                scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
                            } else if (itemBottom > dropdownBottom) {
                                scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
                            }

                            if (typeof scrollTop !== 'undefined') {
                                $dropdown.stop(true).animate({ scrollTop: scrollTop }, 100);
                            }
                        }
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        e.preventDefault();

                        var discussion = this.props.discussion;
                        var recipients = this.selected;

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
                        this.selected = new ItemList();
                    }
                }, {
                    key: "config",
                    value: function config(isInitialized) {
                        var _this2 = this;

                        // Highlight the item that is currently selected.
                        this.setIndex(this.getCurrentNumericIndex());

                        if (isInitialized) return;

                        this.$('.Search-results').on('click', function (e) {
                            var target = _this2.$(e.target);

                            _this2.addRecipient(target.parents('.UserSearchResult').data('data-index')).bind(_this2);
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
                                this.selected.toArray().map(function (recipient) {
                                    return m(
                                        "span",
                                        { className: "RecipientsInput-tag", onclick: function onclick() {
                                                _this3.removeRecipient(recipient);
                                                _this3.onready();
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
                    value: function addRecipient(recipient) {
                        console.log({
                            add: recipient
                        });
                        this.selected.push(recipient);
                    }
                }, {
                    key: "removeRecipient",
                    value: function removeRecipient(recipient) {
                        console.log({
                            remove: recipient
                        });
                        this.selected.remove(recipient);
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

System.register('flagrow/messaging/helpers/recipientLabel', ['flarum/utils/extract'], function (_export, _context) {
  "use strict";

  var extract;
  function recipientLabel(tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    attrs.style = attrs.style || {};
    attrs.className = 'RecipientLabel ' + (attrs.className || '');

    var link = extract(attrs, 'link');

    if (tag) {
      var color = tag.color();
      if (color) {
        attrs.style.backgroundColor = attrs.style.color = color;
        attrs.className += ' colored';
      }

      if (link) {
        attrs.title = tag.description() || '';
        attrs.href = app.route('user', { user: user.slug() });
        attrs.config = m.route;
      }
    } else {
      attrs.className += ' none';
    }

    return m(link ? 'a' : 'span', attrs, m(
      'span',
      { className: 'RecipientLabel-text' },
      user ? user.username() : app.translator.trans('flagrow-messaging.forum.labels.lib.user_deleted')
    ));
  }

  _export('default', recipientLabel);

  return {
    setters: [function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
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

    if (recipients) {} else {
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

System.register('flagrow/messaging/main', ['flarum/Model', 'flarum/models/Discussion', 'flagrow/messaging/addRecipientComposer'], function (_export, _context) {
    "use strict";

    var Model, Discussion, addRecipientComposer;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flagrowMessagingAddRecipientComposer) {
            addRecipientComposer = _flagrowMessagingAddRecipientComposer.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-messaging', function (app) {
                Discussion.prototype.recipients = Model.hasMany('recipients');

                addRecipientComposer();
            });
        }
    };
});