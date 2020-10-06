import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import icon from 'flarum/helpers/icon';
import PrivateDiscussionList from './PrivateDiscussionList';
import WelcomeHero from 'flarum/components/WelcomeHero';
import PrivateDiscussionComposer from './PrivateDiscussionComposer';
import LogInModal from 'flarum/components/LogInModal';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Select from 'flarum/components/Select';
import Button from 'flarum/components/Button';
import LinkButton from 'flarum/components/LinkButton';
import SelectDropdown from 'flarum/components/SelectDropdown';

export default class PrivateDiscussionIndex extends Page {
    oninit(vnode) {
        super.oninit(vnode);

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

        const params = this.params();

        if (app.cache.privateDiscussionList) {
            // Compare the requested parameters (sort, search query) to the ones that
            // are currently present in the cached discussion list. If they differ, we
            // will clear the cache and set up a new discussion list component with
            // the new parameters.
            Object.keys(params).some((key) => {
                if (app.cache.privateDiscussionList.attrs.params[key] !== params[key]) {
                    app.cache.privateDiscussionList = null;
                    return true;
                }
            });
        }

        if (!app.cache.privateDiscussionList) {
            app.cache.privateDiscussionList = new PrivateDiscussionList({ params });
        }

        app.history.push('private-index', icon('far fa-map'));

        this.bodyClass = 'App--index';
    }

    view() {
        return (
            <div className="IndexPage">
                {this.hero()}
                <div className="container">
                    <nav className="IndexPage-nav sideNav">
                        <ul>{listItems(this.sidebarItems().toArray())}</ul>
                    </nav>
                    <div className="IndexPage-results sideNavOffset">
                        <div className="IndexPage-toolbar">
                            <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                            <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
                        </div>
                        {app.cache.discussionList.render()}
                    </div>
                </div>
            </div>
        );
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        app.setTitle('');
        app.setTitleCount(0);

        // Work out the difference between the height of this hero and that of the
        // previous hero. Maintain the same scroll position relative to the bottom
        // of the hero so that the sidebar doesn't jump around.
        const oldHeroHeight = app.cache.heroHeight;
        const heroHeight = (app.cache.heroHeight = this.$('.Hero').outerHeight());
        const scrollTop = app.cache.scrollTop;

        $('#app').css('min-height', $(window).height() + heroHeight);

        // Scroll to the remembered position. We do this after a short delay so that
        // it happens after the browser has done its own "back button" scrolling,
        // which isn't right. https://github.com/flarum/core/issues/835
        const scroll = () => $(window).scrollTop(scrollTop - oldHeroHeight + heroHeight);
        scroll();
        setTimeout(scroll, 1);

        // If we've just returned from a discussion page, then the constructor will
        // have set the `lastDiscussion` property. If this is the case, we want to
        // scroll down to that discussion so that it's in view.
        if (this.lastDiscussion) {
            const $discussion = this.$(`.DiscussionListItem[data-id="${this.lastDiscussion.id()}"]`);

            if ($discussion.length) {
                const indexTop = $('#header').outerHeight();
                const indexBottom = $(window).height();
                const discussionTop = $discussion.offset().top;
                const discussionBottom = discussionTop + $discussion.outerHeight();

                if (discussionTop < scrollTop + indexTop || discussionBottom > scrollTop + indexBottom) {
                    $(window).scrollTop(discussionTop - indexTop);
                }
            }
        }
    }

    onremove(vnode) {
        super.onremove(vnode);

        $('#app').css('min-height', '');

        // Save the scroll position so we can restore it when we return to the
        // discussion list.
        app.cache.scrollTop = $(window).scrollTop();
    }

    /**
     * Get the component to display as the hero.
     *
     * @return {MithrilComponent}
     */
    hero() {
        return WelcomeHero.component();
    }

    /**
     * Build an item list for the sidebar of the index page. By default this is a
     * "New Discussion" button, and then a DropdownSelect component containing a
     * list of navigation items.
     *
     * @return {ItemList}
     */
    sidebarItems() {
        const items = new ItemList();
        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

        items.add(
            'newDiscussion',
            Button.component({
                icon: 'fas fa-edit',
                className: 'Button Button--primary IndexPage-newDiscussion',
                itemClassName: 'App-primaryControl',
                onclick: this.newDiscussion.bind(this),
                disabled: !canStartDiscussion,
            }, app.translator.trans(
                canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'
            ))
        );

        items.add(
            'nav',
            SelectDropdown.component({
                buttonClassName: 'Button',
                className: 'App-titleControl',
            }, this.navItems(this).toArray())
        );

        return items;
    }

    /**
     * Build an item list for the navigation in the sidebar of the index page. By
     * default this is just the 'All Discussions' link.
     *
     * @return {ItemList}
     */
    navItems() {
        const items = new ItemList();
        const params = this.stickyParams();

        items.add(
            'allDiscussions',
            LinkButton.component({
                href: app.route('index', params),
                icon: 'far fa-comments',
            }, app.translator.trans('core.forum.index.all_discussions_link')),
            100
        );

        return items;
    }

    /**
     * Build an item list for the part of the toolbar which is concerned with how
     * the results are displayed. By default this is just a select box to change
     * the way discussions are sorted.
     *
     * @return {ItemList}
     */
    viewItems() {
        const items = new ItemList();
        const sortMap = app.cache.discussionList.sortMap();

        const sortOptions = {};
        for (const i in sortMap) {
            sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
        }

        items.add(
            'sort',
            Select.component({
                options: sortOptions,
                value: this.params().sort || Object.keys(sortMap)[0],
                onchange: this.changeSort.bind(this),
            })
        );

        return items;
    }

    /**
     * Build an item list for the part of the toolbar which is about taking action
     * on the results. By default this is just a "mark all as read" button.
     *
     * @return {ItemList}
     */
    actionItems() {
        const items = new ItemList();

        items.add(
            'refresh',
            Button.component({
                title: app.translator.trans('core.forum.index.refresh_tooltip'),
                icon: 'fas fa-refresh',
                className: 'Button Button--icon',
                onclick: () => app.cache.discussionList.refresh(),
            })
        );

        if (app.session.user) {
            items.add(
                'markAllAsRead',
                Button.component({
                    title: app.translator.trans('core.forum.index.mark_all_as_read_tooltip'),
                    icon: 'fas fa-check',
                    className: 'Button Button--icon',
                    onclick: this.markAllAsRead.bind(this),
                })
            );
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
    searching() {
        return this.params().q;
    }

    /**
     * Redirect to the index page without a search filter. This is called when the
     * 'x' is clicked in the search box in the header.
     *
     * @see Search
     */
    clearSearch() {
        const params = this.params();
        delete params.q;

        m.route.set(app.route(this.attrs.routeName, params));
    }

    /**
     * Redirect to the index page using the given sort parameter.
     *
     * @param {String} sort
     */
    changeSort(sort) {
        const params = this.params();

        if (sort === Object.keys(app.cache.discussionList.sortMap())[0]) {
            delete params.sort;
        } else {
            params.sort = sort;
        }

        m.route.set(app.route(this.attrs.routeName, params));
    }

    /**
     * Get URL parameters that stick between filter changes.
     *
     * @return {Object}
     */
    stickyParams() {
        return {
            sort: m.route.param('sort'),
            q: m.route.param('q'),
        };
    }

    /**
     * Get parameters to pass to the DiscussionList component.
     *
     * @return {Object}
     */
    params() {
        const params = this.stickyParams();

        params.filter = m.route.param('filter');

        return params;
    }

    /**
     * Log the user in and then open the composer for a new discussion.
     *
     * @return {Promise}
     */
    newDiscussion() {
        if (app.session.user) {
            return this.composeNewDiscussion(deferred);
        } else {
            app.modal.show(LogInModal, { onlogin: this.composeNewDiscussion.bind(this) });
        }
    }

    /**
     * Initialize the composer for a new discussion.
     *
     * @param {Deferred} deferred
     * @return {Promise}
     */
    composeNewDiscussion() {
        return new Promise(resolve => {
            app.composer.load(PrivateDiscussionComposer, { user: app.session.user });
            app.composer.show();

            return resolve(app.composer);
        });
    }

    /**
     * Mark all discussions as read.
     *
     * @return void
     */
    markAllAsRead() {
        const confirmation = confirm(app.translator.trans('core.forum.index.mark_all_as_read_confirmation'));

        if (confirmation) {
            app.session.user.save({ readTime: new Date() });
        }
    }
}
