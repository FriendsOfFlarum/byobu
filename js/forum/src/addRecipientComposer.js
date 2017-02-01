import {extend, override} from "flarum/extend";
import DiscussionComposer from "flarum/components/DiscussionComposer";
import AddRecipientModal from "flagrow/byobu/components/AddRecipientModal";
import recipientCountLabel from "flagrow/byobu/helpers/recipientCountLabel";

export default function (app) {
    // Add recipient-selection abilities to the discussion composer.
    DiscussionComposer.prototype.recipients = [];

    DiscussionComposer.prototype.chooseRecipients = function () {
        app.modal.show(
            new AddRecipientModal({
                selectedRecipients: this.recipients,
                onsubmit: (recipients) => {
                    this.recipients = recipients;
                    this.$('textarea').focus();
                }
            })
        )
    };

    // Add a tag-selection menu to the discussion composer's header, after the
    // title.
    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {

            const recipients = this.recipients ? this.recipients.toArray() : [];

            items.add('recipients', (
                <a className="DiscussionComposer-changeRecipients" onclick={this.chooseRecipients.bind(this)}>
                    {recipients.length
                        ? recipientCountLabel(recipients.length)
                        : <span className="RecipientLabel none">{app.translator.trans('flagrow-byobu.forum.buttons.add_recipients')}</span>}
                </a>
            ), 5);
        }
    });

    // Add the selected tags as data to submit to the server.
    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.recipients = this.recipients;
    });
}
