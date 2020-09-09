import { extend } from 'flarum/extend';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';
import PrivateDiscussionsUserPage from './components/PrivateDiscussionsUserPage';

export default function () {
    app.routes['user.byobu'] = { path: '/u/:username/byobu', component: PrivateDiscussionsUserPage };

    extend(UserPage.prototype, 'navItems', function (items) {
        const href = app.route('user.byobu', { username: this.user.username() });

        // Hide links from guests if they are not already on the page
        if (!app.session.user && m.route.get() !== href) return;

        items.add(
            'byobu',
            LinkButton.component({
                href,
                icon: 'fas fa-map',
            }, app.translator.trans('fof-byobu.forum.user.byobu_link')),
            85
        );
    });
}
