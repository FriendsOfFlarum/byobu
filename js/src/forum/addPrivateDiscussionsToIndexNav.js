import { extend } from 'flarum/extend';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionListState from 'flarum/states/DiscussionListState';

export default (app) => {
    app.routes.byobuPrivate = {path: '/private', component: IndexPage};

    extend(IndexPage.prototype, 'navItems', (items) => {
        const user = app.session.user;

        if (user) {
            items.add(
                'privateDiscussions',
                LinkButton.component({
                    icon: 'fas fa-map',
                    href: app.route('byobuPrivate'),
                }, app.translator.trans('fof-byobu.forum.user.dropdown_label')),
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
};
