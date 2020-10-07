import extract from 'flarum/utils/extract';
import username from 'flarum/helpers/username';
import User from 'flarum/models/User';
import Group from 'flarum/models/Group';
import LinkButton from 'flarum/components/LinkButton';

export default function recipientLabel(recipient, attrs = {}) {
    attrs.style = attrs.style || {};
    attrs.className = 'RecipientLabel ' + (attrs.className || '');
    attrs.href = extract(attrs, 'link');

    let label;

    if (recipient instanceof User) {
        label = username(recipient);

        if (attrs.href) {
            attrs.title = recipient.username() || '';
            attrs.href = app.route.user(recipient);
        }
    } else if (recipient instanceof Group) {
        label = recipient.namePlural();
    } else {
        attrs.className += ' none';
        label = app.translator.trans('fof-byobu.forum.labels.user_deleted');
    }

    return LinkButton.component(attrs, label);
}
