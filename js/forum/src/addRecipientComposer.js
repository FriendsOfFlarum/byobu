import {extend, override} from "flarum/extend";
import DiscussionComposer from "flarum/components/DiscussionComposer";
import AddRecipientModal from "flagrow/byobu/components/AddRecipientModal";
import recipientsLabel from "flagrow/byobu/helpers/recipientsLabel";

export default function (app) {
    // Add recipient-selection abilities to the discussion composer.
    DiscussionComposer.prototype.recipients = [];

    DiscussionComposer.prototype.chooseRecipients = function () {
        app.modal.show(
            new AddRecipientModal({
                selectedRecipients: this.recipients,
                onsubmit: recipients => {
                    this.recipients = recipients;
                    this.$('textarea').focus();
                }
            })
        );

        // Add a tag-selection menu to the discussion composer's header, after the
        // title.
        extend(DiscussionComposer.prototype, 'headerItems', function (items) {
            console.log(app.forum);
            if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
                items.add('recipients', (
                    <a className="DiscussionComposer-changeRecipients" onclick={this.chooseRecipients.bind(this)}>
                        {this.recipients.length
                            ? recipientsLabel(this.recipients)
                            : <span className="RecipientLabel none">{app.translator.trans('flagrow-byobu.forum.buttons.add_recipients')}</span>}
                    </a>
                ), 5);
            }
        });
    }

    // Add the selected tags as data to submit to the server.
    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.recipients = this.recipients;
    });
}
