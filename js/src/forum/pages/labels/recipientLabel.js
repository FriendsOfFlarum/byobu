import extract from 'flarum/common/utils/extract';
import username from 'flarum/common/helpers/username';
import User from 'flarum/common/models/User';
import Group from 'flarum/common/models/Group';
import LinkButton from 'flarum/common/components/LinkButton';

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
