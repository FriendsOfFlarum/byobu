import { extend, override } from "flarum/extend";
import PrivateDiscussionComposer from "./components/PrivateDiscussionComposer";
import AddRecipientModal from "./components/AddRecipientModal";
import recipientCountLabel from "../common/helpers/recipientCountLabel";
import User from "flarum/models/User";
import Group from "flarum/models/Group";
import ItemList from "flarum/utils/ItemList";

export default function (app) {
    // Add recipient-selection abilities to the discussion composer.
    PrivateDiscussionComposer.prototype.recipients = new ItemList;
    PrivateDiscussionComposer.prototype.recipientUsers = [];
    PrivateDiscussionComposer.prototype.recipientGroups = [];

    // Add the session user as a recipient
    // If the composer is triggered from a different user page, add them as a recipient
    PrivateDiscussionComposer.prototype.addDefaultRecipients = function (username) {
        const user = app.store.getBy('users', 'username', username);

        this.recipients.add('users:' + app.session.user.id(), app.session.user);
        if(user.id() !== app.session.user.id()) {
            this.recipients.add('users:' + user.id(), user);
        }
    };

    // Add a recipient selection modal when clicking the recipient tag label.
    PrivateDiscussionComposer.prototype.chooseRecipients = function () {
        //const actorRecipientClassName = '.RecipientsInput-selected > .RecipientLabel:first-child';
        app.modal.show(
            new AddRecipientModal({
                selectedRecipients: this.recipients,
                onsubmit: (recipients) => {
                    this.recipients = recipients;

                    // Focus on recipient autocomplete field.
                    this.$('.RecipientsInput').focus();
                }
            })
        )
        //$(actorRecipientClassName).css('display', 'none');
    };

    // Add a tag-selection menu to the discussion composer's header, after the
    // title.
    extend(PrivateDiscussionComposer.prototype, 'headerItems', function (items) {
        if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
            const recipients = this.recipients.toArray();

            items.add('recipients', (
                <a className="PrivateDiscussionComposer-changeRecipients"
                    onclick={this.chooseRecipients.bind(this)}>
                    {recipients.length
                        ? recipientCountLabel(recipients.length)
                        : <span className="RecipientLabel none">{app.translator.trans('fof-byobu.forum.buttons.add_recipients')}</span>}
                </a>
            ), 5);
        }
    });

    // Add the selected tags as data to submit to the server.
    extend(PrivateDiscussionComposer.prototype, 'data', function (data) {
        const users = [];
        const groups = [];
        this.recipients.toArray().forEach(recipient => {

            if (recipient instanceof User) {
                users.push(recipient);
            }

            if (recipient instanceof Group) {
                groups.push(recipient);
            }
        });

        data.relationships = data.relationships || {};

        if (users.length) {
            data.relationships.recipientUsers = users;
        }

        if (groups.length) {
            data.relationships.recipientGroups = groups;
        }
    });
}
