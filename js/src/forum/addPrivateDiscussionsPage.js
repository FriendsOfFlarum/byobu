import {extend} from 'flarum/extend';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

import PrivateDiscussionsUserPage from "./components/PrivateDiscussionsUserPage";
import removeTags from './removeTags';

export default function () {
    app.routes['user.byobu'] = {path: '/u/:username/byobu', component: PrivateDiscussionsUserPage.component()};

    extend(UserPage.prototype, 'navItems', function (items) {
        const href = app.route('user.byobu', {username: this.user.username()});

        // Hide links from guests if they are not already on the page
        if (!app.session.user && m.route() !== href) return;

        items.add('byobu',
            LinkButton.component({
                href,
                children: app.translator.trans('fof-byobu.forum.user.byobu_link'),
                icon: 'fas fa-map'
            }),
            85
        );

        if (app.forum.attribute('byobuTag')) {
            removeTags();
        }
    })
}
