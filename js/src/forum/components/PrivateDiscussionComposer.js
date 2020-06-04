import { extend } from 'flarum/extend';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import AddRecipientModal from './AddRecipientModal';

export default class PrivateDiscussionComposer extends DiscussionComposer {
    init() {
        super.init();
        this.chooseRecipients();

        const username = m.route.param('username');

        if (typeof username !== 'undefined') {
            this.addDefaultRecipients(username);
        }

        if (app.forum.attribute('byobuTag') && app.forum.attribute('byobuTag').length > 0) {
            extend(PrivateDiscussionComposer.prototype, 'headerItems', function(items) {
                items.remove('tags');
            });
        }
    }

    onsubmit() {
        this.loading = true;

        const recipients = this.recipients.toArray();

        if (recipients.length < 2) {
            app.modal.show(
                new AddRecipientModal({
                    selectedRecipients: this.recipients,
                })
            );

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
                .then(discussion => {
                    if (app.cache.discussionList) {
                        //app.cache.discussionList.addDiscussion(discussion);
                        app.cache.discussionList.refresh();
                    }
                    //this.loading = false;
                    m.route(app.route.discussion(discussion));

                    app.composer.hide();
                }, this.loaded.bind(this));
        }
    }
}
