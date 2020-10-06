import { extend } from 'flarum/extend';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import AddRecipientModal from './AddRecipientModal';
import ItemList from 'flarum/utils/ItemList';

export default class PrivateDiscussionComposer extends DiscussionComposer {
    oninit(vnode) {
        super.oninit(vnode);

        app.composer.fields.recipients = app.composer.fields.recipients = new ItemList();

        const username = m.route.param('username');

        if (typeof username !== 'undefined') {
            this.addDefaultRecipients(username);
        }

        if (app.forum.attribute('byobuTag') && app.forum.attribute('byobuTag').length > 0) {
            extend(PrivateDiscussionComposer.prototype, 'headerItems', function (items) {
                items.remove('tags');
            });
        }
    }

    getRecipientArr() {
        return app.composer.fields.recipients ? app.composer.fields.recipients.toArray() : [];
    }

    chooseRecipients() {
        //const actorRecipientClassName = '.RecipientsInput-selected > .RecipientLabel:first-child';
        app.modal.show(AddRecipientModal, {
            selectedRecipients: app.composer.fields.recipients,
            onsubmit: (recipients) => {
                app.composer.fields.recipients = recipients;

                // Focus on recipient autocomplete field.
                this.$('.RecipientsInput').focus();
            },
        }
        );
        //$(actorRecipientClassName).css('display', 'none');
    }

    onsubmit() {
        this.loading = true;

        const recipients = app.composer.fields.recipients.toArray();

        if (recipients.length < 2) {
            app.modal.show(AddRecipientModal, { selectedRecipients: app.composer.fields.recipients });

            this.loading = false;
        } else {
            const tag = app.store.getBy('tags', 'slug', app.forum.attribute('byobuTag'));

            if (tag) {
                if (tag.data.attributes.isChild) {
                    // This is a secondary tag! We also need the primary! :)

                    const parentTagId = tag.data.relationships.parent.data.id;
                    const parentTag = app.store.getBy('tags', 'id', parentTagId);

                    this.tags = [parentTag, tag];
                } else {
                    this.tags = [tag];
                }
            } else {
                console.error('fof/byobu: Could not find tag with slug ' + app.forum.attribute('byobuTag'));
            }

            const data = this.data();

            app.store
                .createRecord('discussions')
                .save(data)
                .then((discussion) => {
                    if (app.cache.discussionList) {
                        //app.cache.discussionList.addDiscussion(discussion);
                        app.cache.discussionList.refresh();
                    }
                    //this.loading = false;
                    m.route.set(app.route.discussion(discussion));

                    app.composer.hide();
                }, this.loaded.bind(this));
        }
    }
}
