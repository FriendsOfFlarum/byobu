import { extend } from 'flarum/extend';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';
import User from "flarum/models/User";
import Group from "flarum/models/Group";

import AddRecipientModal from './components/AddRecipientModal';

export default function () {
    // Add a control allowing the discussion to be moved to another category.
    extend(DiscussionControls, 'moderationControls', function (items, discussion) {
        if (discussion.canEditRecipients()) {
            items.add('recipients', Button.component({
                children: app.translator.trans('fof-byobu.forum.buttons.edit_recipients'),
                icon: 'far fa-map',
                onclick: () => app.modal.show(new AddRecipientModal({ discussion }))
            }));
        }

       if (discussion.recipientUsers().length) {
            items.add('remove', Button.component({
                children: app.translator.trans('fof-byobu.forum.buttons.remove_from_discussion'),
                icon: 'fas fa-user-slash',
                onclick: () => {
                    if (discussion) {

                        let recipients = new ItemList();
                        discussion.recipientUsers().map(user => {
                            if (app.session.user.id() !== user.id()) {
                                recipients.add("users:" + user.id(), user);
                            }
                        });

                        let recipientGroups = [];
                        let recipientUsers = [];

                        recipients.toArray().forEach(recipient => {
                            if (recipient instanceof User) {
                                recipientUsers.push(recipient);
                            }
                            if (recipient instanceof Group) {
                                recipientGroups.push(recipient);
                            }
                        });

                        discussion.save({ relationships: { recipientUsers, recipientGroups } }).then(() => app.history.back());
                    }
                }
            }));
        }
    });
}
