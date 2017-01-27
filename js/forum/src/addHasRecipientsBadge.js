import {extend} from "flarum/extend";
import Discussion from "flarum/models/Discussion";
import Badge from "flarum/components/Badge";

export default function addHasRecipientsBadge() {
    extend(Discussion.prototype, 'badges', function (badges) {
        if (this.recipients().length) {
            badges.add('private', Badge.component({
                type: 'private',
                label: app.translator.trans('flagrow-byobu.forum.badges.is_private.tooltip'),
                icon: 'map'
            }), 10);
        }
    });
}
