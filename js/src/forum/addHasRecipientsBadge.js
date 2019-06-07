import {extend} from "flarum/extend";
import Discussion from "flarum/models/Discussion";
import Badge from "flarum/components/Badge";

export default function addHasRecipientsBadge() {
    extend(Discussion.prototype, 'badges', function (badges) {
        if (this.recipientUsers().length || this.recipientGroups().length) {
            badges.add('private', Badge.component({
                type: 'private',
                label: app.translator.trans('fof-byobu.forum.badges.is_private.tooltip'),
                icon: 'fas fa-map'
            }), 10);
        }
    });
}
