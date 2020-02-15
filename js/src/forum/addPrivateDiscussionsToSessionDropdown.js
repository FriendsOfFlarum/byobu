import { extend } from 'flarum/extend';
import LinkButton from 'flarum/components/LinkButton';
import SessionDropdown from 'flarum/components/SessionDropdown';

export default () => {
    extend(SessionDropdown.prototype, 'items', items => {
        const user = app.session.user;

        items.add('privateDiscussions',
            LinkButton.component({
                icon: 'fas fa-map',
                children: app.translator.trans('fof-byobu.forum.user.dropdown_label'),
                href: app.route('user.byobu', { username: user.username() }),
            }), 99
        );
    })
}