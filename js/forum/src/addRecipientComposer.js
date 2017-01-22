import { extend, override } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionComposer from 'flarum/components/DiscussionComposer';

import TagDiscussionModal from 'flarum/tags/components/TagDiscussionModal';
import recipientsLabel from 'flagrow/messaging/helpers/recipientsLabel';

export default function() {
    extend(IndexPage.prototype, 'composeNewDiscussion', function(promise) {
        // const tag = app.store.getBy('tags', 'slug', this.params().tags);

        // if (tag) {
        //     const parent = tag.parent();
        //     const tags = parent ? [parent, tag] : [tag];
        //     promise.then(component => component.tags = tags);
        // }
    });

    // Add tag-selection abilities to the discussion composer.
    DiscussionComposer.prototype.recipients = [];
    DiscussionComposer.prototype.chooseRecipients = function() {
        app.modal.show(
            new AddRecipientModal({
                selectedRecipients: this.recipients.slice(0),
                onsubmit: recipients => {
                    this.recipients = recipients;
                    this.$('textarea').focus();
                }
            })
        );
    };

    // Add a tag-selection menu to the discussion composer's header, after the
    // title.
    extend(DiscussionComposer.prototype, 'headerItems', function(items) {
        items.add('recipients', (
            <a className="DiscussionComposer-changeRecipients" onclick={this.chooseTags.bind(this)}>
                {this.tags.length
                    ? recipientsLabel(this.recipients)
                    : <span className="RecipientLabel none">{app.translator.trans('flagrow-messaging.forum.buttons.add_recipients')}</span>}
            </a>
        ), 5);
    });

    override(DiscussionComposer.prototype, 'onsubmit', function(original) {
        if (!this.recipients.length) {
            app.modal.show(
                // new TagDiscussionModal({
                //     selectedTags: [],
                //     onsubmit: tags => {
                //         this.tags = tags;
                //         original();
                //     }
                // })
            );
        } else {
            original();
        }
    });

    // Add the selected tags as data to submit to the server.
    extend(DiscussionComposer.prototype, 'data', function(data) {
        data.relationships = data.relationships || {};
        data.relationships.recipients = this.recipients;
    });
}
