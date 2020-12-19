import { extend } from 'flarum/extend';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionListState from 'flarum/states/DiscussionListState';
import PrivateComposing from "./PrivateComposing";

export default (app) => {
    extend(IndexPage.prototype, 'navItems', (items) => {
        const user = app.session.user;

        if (user) {
            items.add(
                'privateDiscussions',
                LinkButton.component({
                    icon: app.forum.data.attributes['byobu.icon-badge'],
                    href: app.route('byobuPrivate'),
                }, app.translator.trans('fof-byobu.forum.nav.nav_item')),
                75
            );
        }
    });

    extend(IndexPage.prototype, 'setTitle', function () {
        if (app.current.get('routeName') === 'byobuPrivate') {
            app.setTitle(app.translator.trans('fof-byobu.forum.user.dropdown_label'));
        }
    });

    extend(DiscussionListState.prototype, 'requestParams', function(params) {
        if (app.current.get('routeName') === 'byobuPrivate') {
            params.filter.q = (params.filter.q || '') + ' is:private';
        }
    });

    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        if (app.current.get('routeName') === 'byobuPrivate') {
            let compose = new PrivateComposing;

            items.replace(
                'newDiscussion',
                compose.component()
            );
        }
    });
}
