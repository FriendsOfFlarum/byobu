import { extend } from 'flarum/extend';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import ItemList from 'flarum/utils/ItemList';
import User from 'flarum/models/User';
import Group from 'flarum/models/Group';
import Button from 'flarum/components/Button';

import AddRecipientModal from './components/AddRecipientModal';

export default function () {
    // Add a control allowing the discussion to be moved to another category.
    extend(DiscussionControls, 'moderationControls', function (items, discussion) {
        if (discussion.canEditRecipients()) {
            items.add(
                'recipients',
                Button.component({
                    icon: 'far fa-map',
                    onclick: () => app.modal.show(AddRecipientModal, { discussion }),
                }, app.translator.trans('fof-byobu.forum.buttons.edit_recipients'))
            );
        }

        if (discussion.recipientUsers().length > 0 && discussion.canMakePublic()) {
            items.add(
                'make_public',
                Button.component({
                    icon: 'far fa-eye',
                    onclick: () => {
                        if (discussion && confirm(app.translator.trans('fof-byobu.forum.confirm.make_public'))) {
                            let recipientGroups = [];
                            let recipientUsers = [];

                            discussion.save({ relationships: { recipientUsers, recipientGroups } }).then(() => m.redraw());
                        }
                    },
                }, app.translator.trans('fof-byobu.forum.buttons.make_public'))
            );
        }

        if (discussion.recipientUsers().length > 1) {
            items.add(
                'remove',
                Button.component({
                    icon: 'fas fa-user-slash',
                    onclick: () => {
                        if (discussion) {
                            let recipients = new ItemList();
                            discussion.recipientUsers().map((user) => {
                                if (app.session.user.id() !== user.id()) {
                                    recipients.add('users:' + user.id(), user);
                                }
                            });

                            let recipientGroups = [];
                            let recipientUsers = [];

                            recipients.toArray().forEach((recipient) => {
                                if (recipient instanceof User) {
                                    recipientUsers.push(recipient);
                                }
                                if (recipient instanceof Group) {
                                    recipientGroups.push(recipient);
                                }
                            });

                            discussion.save({ relationships: { recipientUsers, recipientGroups } }).then(() => app.history.back());
                        }
                    },
                }, app.translator.trans('fof-byobu.forum.buttons.remove_from_discussion'))
            );
        }
    });
}
