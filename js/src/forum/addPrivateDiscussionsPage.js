import {extend} from 'flarum/extend';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

import PrivateDiscussionsUserPage from "./components/PrivateDiscussionsUserPage";

export default function () {
    if (!Number(app.data['fof-byobu.enable_byobu_user_page'])) return;

    app.routes['user.byobu'] = {path: '/u/:username/byobu', component: PrivateDiscussionsUserPage.component()};

    extend(UserPage.prototype, 'navItems', function (items) {
        items.add('byobu',
            LinkButton.component({
                href: app.route('user.byobu', {username: this.user.username()}),
                children: app.translator.trans('fof-byobu.forum.user.byobu_link'),
                icon: 'fas fa-map'
            }),
            85
        );
    })
}
