import { extend } from 'flarum/extend';
import LinkButton from 'flarum/components/LinkButton';
import SessionDropdown from 'flarum/components/SessionDropdown';
import IndexPage from 'flarum/components/IndexPage';

export default () => {
    extend(SessionDropdown.prototype, 'items', (items) => {
        const user = app.session.user;

        items.add(
            'privateDiscussions',
            LinkButton.component({
                icon: 'fas fa-map',
                href: app.route('user.byobu', { username: user.username() }),
            }, app.translator.trans('fof-byobu.forum.user.dropdown_label')),
            99
        );
    });

    extend(IndexPage.prototype, 'navItems', (items) => {
        const user = app.session.user;

        if (app.forum.attribute('byobuOnIndex') && user) {
            items.add(
                'privateDiscussions',
                LinkButton.component({
                    icon: 'fas fa-map',
                    href: app.route('user.byobu', { username: user.username() }),
                }, app.translator.trans('fof-byobu.forum.user.dropdown_label')),
                75
            );
        }
    });
};
