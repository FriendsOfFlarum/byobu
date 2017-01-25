'use strict';

System.register('flagrow/byobu/addRecipientComposer', ['flarum/extend', 'flarum/components/DiscussionComposer', 'flagrow/byobu/components/AddRecipientModal', 'flagrow/byobu/helpers/recipientsLabel'], function (_export, _context) {
    "use strict";

    var extend, override, DiscussionComposer, AddRecipientModal, recipientsLabel;

    _export('default', function () {

        var allowed = app.session.user && app.forum.attribute('canStartPrivateDiscussion');

        // Add recipient-selection abilities to the discussion composer.
        DiscussionComposer.prototype.recipients = [];

        if (allowed) {
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
                        {
                            className: 'RecipientLabel none' },
                        app.translator.trans('flagrow-byobu.forum.buttons.add_recipients')
                    )
                ), 5);
            });
        }

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
        }, function (_flagrowByobuComponentsAddRecipientModal) {
            AddRecipientModal = _flagrowByobuComponentsAddRecipientModal.default;
        }, function (_flagrowByobuHelpersRecipientsLabel) {
            recipientsLabel = _flagrowByobuHelpersRecipientsLabel.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/byobu/addRecipientLabels', ['flarum/extend', 'flarum/components/DiscussionListItem', 'flarum/components/DiscussionPage', 'flarum/components/DiscussionHero', 'flagrow/byobu/helpers/recipientsLabel'], function (_export, _context) {
    "use strict";

    var extend, DiscussionListItem, DiscussionPage, DiscussionHero, recipientsLabel;

    _export('default', function () {

        /**
         * Adds User labels on the discussion index page.
         */
        extend(DiscussionListItem.prototype, 'infoItems', function (items) {
            var recipients = this.props.discussion.recipients();

            if (recipients && recipients.length) {
                items.add('recipients', recipientsLabel(recipients), 20);
            }
        });

        /**
         * Require recipients from the API whenever we're loading a Discussion page.
         */
        extend(DiscussionPage.prototype, 'params', function (params) {
            params.include.push('recipients');
        });

        /**
         * Adds User labels on the discussion Hero.
         */
        extend(DiscussionHero.prototype, 'items', function (items) {
            var recipients = this.props.discussion.recipients();

            if (recipients && recipients.length) {
                items.remove('tags');
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
        }, function (_flagrowByobuHelpersRecipientsLabel) {
            recipientsLabel = _flagrowByobuHelpersRecipientsLabel.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/byobu/components/AddRecipientModal', ['flarum/components/Modal', 'flarum/components/DiscussionPage', 'flarum/components/Button', 'flarum/utils/ItemList', 'flagrow/byobu/components/RecipientSearch'], function (_export, _context) {
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
        }, function (_flagrowByobuComponentsRecipientSearch) {
            RecipientSearch = _flagrowByobuComponentsRecipientSearch.default;
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
                        return this.props.discussion ? app.translator.trans('flagrow-byobu.forum.modal.titles.update_recipients', { title: m(
                                'em',
                                null,
                                this.props.discussion.title()
                            ) }) : app.translator.trans('flagrow-byobu.forum.modal.titles.add_recipients');
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
                                        children: app.translator.trans('flagrow-byobu.forum.buttons.submit')
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
'use strict';

System.register('flagrow/byobu/components/PrivateDiscussionIndex', ['flarum/extend', 'flarum/components/Page', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/helpers/icon', 'flagrow/byobu/components/PrivateDiscussionList', 'flarum/components/WelcomeHero', 'flarum/components/DiscussionComposer', 'flarum/components/LogInModal', 'flarum/components/DiscussionPage', 'flarum/components/Select', 'flarum/components/Button', 'flarum/components/LinkButton', 'flarum/components/SelectDropdown'], function (_export, _context) {
    "use strict";

    var extend, Page, ItemList, listItems, icon, PrivateDiscussionList, WelcomeHero, DiscussionComposer, LogInModal, DiscussionPage, Select, Button, LinkButton, SelectDropdown, PrivateDiscussionIndex;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flagrowByobuComponentsPrivateDiscussionList) {
            PrivateDiscussionList = _flagrowByobuComponentsPrivateDiscussionList.default;
        }, function (_flarumComponentsWelcomeHero) {
            WelcomeHero = _flarumComponentsWelcomeHero.default;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flarumComponentsLogInModal) {
            LogInModal = _flarumComponentsLogInModal.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }, function (_flarumComponentsSelectDropdown) {
            SelectDropdown = _flarumComponentsSelectDropdown.default;
        }],
        execute: function () {
            PrivateDiscussionIndex = function (_Page) {
                babelHelpers.inherits(PrivateDiscussionIndex, _Page);

                function PrivateDiscussionIndex() {
                    babelHelpers.classCallCheck(this, PrivateDiscussionIndex);
                    return babelHelpers.possibleConstructorReturn(this, (PrivateDiscussionIndex.__proto__ || Object.getPrototypeOf(PrivateDiscussionIndex)).apply(this, arguments));
                }

                babelHelpers.createClass(PrivateDiscussionIndex, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(PrivateDiscussionIndex.prototype.__proto__ || Object.getPrototypeOf(PrivateDiscussionIndex.prototype), 'init', this).call(this);

                        // If the user is returning from a discussion page, then take note of which
                        // discussion they have just visited. After the view is rendered, we will
                        // scroll down so that this discussion is in view.
                        if (app.previous instanceof DiscussionPage) {
                            this.lastDiscussion = app.previous.discussion;
                        }

                        // If the user is coming from the discussion list, then they have either
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
                            app.cache.privateDiscussionList = new PrivateDiscussionList({ params: params });
                        }

                        app.history.push('private-index', icon('map-o'));

                        this.bodyClass = 'App--index';
                    }
                }, {
                    key: 'onunload',
                    value: function onunload() {
                        // Save the scroll position so we can restore it when we return to the
                        // discussion list.
                        app.cache.scrollTop = $(window).scrollTop();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'IndexPage' },
                            this.hero(),
                            m(
                                'div',
                                { className: 'container' },
                                m(
                                    'nav',
                                    { className: 'IndexPage-nav sideNav' },
                                    m(
                                        'ul',
                                        null,
                                        listItems(this.sidebarItems().toArray())
                                    )
                                ),
                                m(
                                    'div',
                                    { className: 'IndexPage-results sideNavOffset' },
                                    m(
                                        'div',
                                        { className: 'IndexPage-toolbar' },
                                        m(
                                            'ul',
                                            { className: 'IndexPage-toolbar-view' },
                                            listItems(this.viewItems().toArray())
                                        ),
                                        m(
                                            'ul',
                                            { className: 'IndexPage-toolbar-action' },
                                            listItems(this.actionItems().toArray())
                                        )
                                    ),
                                    app.cache.discussionList.render()
                                )
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized, context) {
                        babelHelpers.get(PrivateDiscussionIndex.prototype.__proto__ || Object.getPrototypeOf(PrivateDiscussionIndex.prototype), 'config', this).apply(this, arguments);

                        if (isInitialized) return;

                        extend(context, 'onunload', function () {
                            return $('#app').css('min-height', '');
                        });

                        app.setTitle('');
                        app.setTitleCount(0);

                        // Work out the difference between the height of this hero and that of the
                        // previous hero. Maintain the same scroll position relative to the bottom
                        // of the hero so that the sidebar doesn't jump around.
                        var oldHeroHeight = app.cache.heroHeight;
                        var heroHeight = app.cache.heroHeight = this.$('.Hero').outerHeight();
                        var scrollTop = app.cache.scrollTop;

                        $('#app').css('min-height', $(window).height() + heroHeight);

                        // Scroll to the remembered position. We do this after a short delay so that
                        // it happens after the browser has done its own "back button" scrolling,
                        // which isn't right. https://github.com/flarum/core/issues/835
                        var scroll = function scroll() {
                            return $(window).scrollTop(scrollTop - oldHeroHeight + heroHeight);
                        };
                        scroll();
                        setTimeout(scroll, 1);

                        // If we've just returned from a discussion page, then the constructor will
                        // have set the `lastDiscussion` property. If this is the case, we want to
                        // scroll down to that discussion so that it's in view.
                        if (this.lastDiscussion) {
                            var $discussion = this.$('.DiscussionListItem[data-id="' + this.lastDiscussion.id() + '"]');

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
                }, {
                    key: 'hero',
                    value: function hero() {
                        return WelcomeHero.component();
                    }
                }, {
                    key: 'sidebarItems',
                    value: function sidebarItems() {
                        var items = new ItemList();
                        var canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

                        items.add('newDiscussion', Button.component({
                            children: app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'),
                            icon: 'edit',
                            className: 'Button Button--primary IndexPage-newDiscussion',
                            itemClassName: 'App-primaryControl',
                            onclick: this.newDiscussion.bind(this),
                            disabled: !canStartDiscussion
                        }));

                        items.add('nav', SelectDropdown.component({
                            children: this.navItems(this).toArray(),
                            buttonClassName: 'Button',
                            className: 'App-titleControl'
                        }));

                        return items;
                    }
                }, {
                    key: 'navItems',
                    value: function navItems() {
                        var items = new ItemList();
                        var params = this.stickyParams();

                        items.add('allDiscussions', LinkButton.component({
                            href: app.route('index', params),
                            children: app.translator.trans('core.forum.index.all_discussions_link'),
                            icon: 'comments-o'
                        }), 100);

                        return items;
                    }
                }, {
                    key: 'viewItems',
                    value: function viewItems() {
                        var items = new ItemList();
                        var sortMap = app.cache.discussionList.sortMap();

                        var sortOptions = {};
                        for (var i in sortMap) {
                            sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
                        }

                        items.add('sort', Select.component({
                            options: sortOptions,
                            value: this.params().sort || Object.keys(sortMap)[0],
                            onchange: this.changeSort.bind(this)
                        }));

                        return items;
                    }
                }, {
                    key: 'actionItems',
                    value: function actionItems() {
                        var items = new ItemList();

                        items.add('refresh', Button.component({
                            title: app.translator.trans('core.forum.index.refresh_tooltip'),
                            icon: 'refresh',
                            className: 'Button Button--icon',
                            onclick: function onclick() {
                                return app.cache.discussionList.refresh();
                            }
                        }));

                        if (app.session.user) {
                            items.add('markAllAsRead', Button.component({
                                title: app.translator.trans('core.forum.index.mark_all_as_read_tooltip'),
                                icon: 'check',
                                className: 'Button Button--icon',
                                onclick: this.markAllAsRead.bind(this)
                            }));
                        }

                        return items;
                    }
                }, {
                    key: 'searching',
                    value: function searching() {
                        return this.params().q;
                    }
                }, {
                    key: 'clearSearch',
                    value: function clearSearch() {
                        var params = this.params();
                        delete params.q;

                        m.route(app.route(this.props.routeName, params));
                    }
                }, {
                    key: 'changeSort',
                    value: function changeSort(sort) {
                        var params = this.params();

                        if (sort === Object.keys(app.cache.discussionList.sortMap())[0]) {
                            delete params.sort;
                        } else {
                            params.sort = sort;
                        }

                        m.route(app.route(this.props.routeName, params));
                    }
                }, {
                    key: 'stickyParams',
                    value: function stickyParams() {
                        return {
                            sort: m.route.param('sort'),
                            q: m.route.param('q')
                        };
                    }
                }, {
                    key: 'params',
                    value: function params() {
                        var params = this.stickyParams();

                        params.filter = m.route.param('filter');

                        return params;
                    }
                }, {
                    key: 'newDiscussion',
                    value: function newDiscussion() {
                        var deferred = m.deferred();

                        if (app.session.user) {
                            this.composeNewDiscussion(deferred);
                        } else {
                            app.modal.show(new LogInModal({
                                onlogin: this.composeNewDiscussion.bind(this, deferred)
                            }));
                        }

                        return deferred.promise;
                    }
                }, {
                    key: 'composeNewDiscussion',
                    value: function composeNewDiscussion(deferred) {
                        var component = new DiscussionComposer({ user: app.session.user });

                        app.composer.load(component);
                        app.composer.show();

                        deferred.resolve(component);

                        return deferred.promise;
                    }
                }, {
                    key: 'markAllAsRead',
                    value: function markAllAsRead() {
                        var confirmation = confirm(app.translator.trans('core.forum.index.mark_all_as_read_confirmation'));

                        if (confirmation) {
                            app.session.user.save({ readTime: new Date() });
                        }
                    }
                }]);
                return PrivateDiscussionIndex;
            }(Page);

            _export('default', PrivateDiscussionIndex);
        }
    };
});;
'use strict';

System.register('flagrow/byobu/components/PrivateDiscussionList', ['flarum/components/DiscussionList'], function (_export, _context) {
    "use strict";

    var DiscussionList, PrivateDiscussionList;
    return {
        setters: [function (_flarumComponentsDiscussionList) {
            DiscussionList = _flarumComponentsDiscussionList.default;
        }],
        execute: function () {
            PrivateDiscussionList = function (_DiscussionList) {
                babelHelpers.inherits(PrivateDiscussionList, _DiscussionList);

                function PrivateDiscussionList() {
                    babelHelpers.classCallCheck(this, PrivateDiscussionList);
                    return babelHelpers.possibleConstructorReturn(this, (PrivateDiscussionList.__proto__ || Object.getPrototypeOf(PrivateDiscussionList)).apply(this, arguments));
                }

                babelHelpers.createClass(PrivateDiscussionList, [{
                    key: 'loadResults',
                    value: function loadResults(offset) {
                        var preloadedDiscussions = app.preloadedDocument();

                        if (preloadedDiscussions) {
                            return m.deferred().resolve(preloadedDiscussions).promise;
                        }

                        var params = this.requestParams();
                        params.q = 'q=is:private';
                        params.page = { offset: offset };
                        params.include = params.include.join(',');

                        return app.store.find('discussions', params);
                    }
                }]);
                return PrivateDiscussionList;
            }(DiscussionList);

            _export('default', PrivateDiscussionList);
        }
    };
});;
"use strict";

System.register("flagrow/byobu/components/RecipientSearch", ["flarum/components/Search", "flagrow/byobu/components/RecipientSearchSource", "flarum/utils/ItemList", "flarum/utils/classList", "flarum/utils/extractText", "flarum/components/LoadingIndicator", "flagrow/byobu/helpers/recipientLabel", "flarum/helpers/icon"], function (_export, _context) {
    "use strict";

    var Search, RecipientSearchSource, ItemList, classList, extractText, LoadingIndicator, recipientLabel, icon, RecipientSearch;
    return {
        setters: [function (_flarumComponentsSearch) {
            Search = _flarumComponentsSearch.default;
        }, function (_flagrowByobuComponentsRecipientSearchSource) {
            RecipientSearchSource = _flagrowByobuComponentsRecipientSearchSource.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flagrowByobuHelpersRecipientLabel) {
            recipientLabel = _flagrowByobuHelpersRecipientLabel.default;
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
                                { className: "RecipientsInput-selected RecipientsLabel" },
                                this.props.selected().toArray().map(function (recipient) {
                                    return recipientLabel(recipient, {
                                        onclick: function onclick() {
                                            _this3.removeRecipient(recipient);
                                        }
                                    });
                                })
                            ),
                            m("input", { className: 'RecipientsInput FormControl ' + classList({
                                    open: !!this.value(),
                                    focused: !!this.value(),
                                    active: !!this.value(),
                                    loading: !!this.loadingSources
                                }),
                                type: "search",
                                placeholder: extractText(app.translator.trans('flagrow-byobu.forum.input.search_recipients')),
                                value: this.value(),
                                oninput: m.withAttr('value', this.value),
                                onfocus: function onfocus() {
                                    return _this3.hasFocus = true;
                                },
                                onblur: function onblur() {
                                    return _this3.hasFocus = false;
                                } }),
                            m(
                                "ul",
                                { className: "Dropdown-menu Search-results" },
                                this.value() && this.value().length >= 3 ? this.sources.map(function (source) {
                                    return source.view(_this3.value());
                                }) : LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' })
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

                        this.clear();
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

System.register('flagrow/byobu/components/RecipientSearchSource', ['flarum/helpers/highlight', 'flarum/helpers/avatar', 'flarum/helpers/username'], function (_export, _context) {
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

System.register('flagrow/byobu/main', ['flarum/Model', 'flarum/models/Discussion', 'flagrow/byobu/addRecipientComposer', 'flagrow/byobu/addRecipientLabels', 'flagrow/byobu/components/PrivateDiscussionIndex'], function (_export, _context) {
    "use strict";

    var Model, Discussion, addRecipientComposer, addRecipientLabels, PrivateDiscussionIndex;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flagrowByobuAddRecipientComposer) {
            addRecipientComposer = _flagrowByobuAddRecipientComposer.default;
        }, function (_flagrowByobuAddRecipientLabels) {
            addRecipientLabels = _flagrowByobuAddRecipientLabels.default;
        }, function (_flagrowByobuComponentsPrivateDiscussionIndex) {
            PrivateDiscussionIndex = _flagrowByobuComponentsPrivateDiscussionIndex.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-byobu', function (app) {
                app.routes.private_discussions = { path: '/private-discussions', component: PrivateDiscussionIndex.component() };

                Discussion.prototype.recipients = Model.hasMany('recipients');

                addRecipientComposer();
                addRecipientLabels();
            });
        }
    };
});