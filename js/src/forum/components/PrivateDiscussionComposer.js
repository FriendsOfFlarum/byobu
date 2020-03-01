import DiscussionComposer from "flarum/components/DiscussionComposer";
import AddRecipientModal from "./AddRecipientModal";

export default class PrivateDiscussionComposer extends DiscussionComposer {
    init() {
        super.init();
        this.chooseRecipients();

        const username = m.route.param('username');

        if (typeof username !== 'undefined') {
            this.addDefaultRecipients(username);
        }
    }

    onsubmit() {
        this.loading = true;

        const recipients = this.recipients.toArray();

        if (recipients.length < 2) {
            app.modal.show(new AddRecipientModal({
                selectedRecipients: this.recipients
            }))

            this.loading = false;
        } else {
            const data = this.data();

            app.store.createRecord('discussions').save(data).then(
                discussion => {
                    app.composer.hide();
                    if (app.cache.discussionList) {
                        app.cache.discussionList.addDiscussion(discussion);
                    }
                    m.route(app.route.discussion(discussion));
                },
                this.loaded.bind(this)
            );
        }
    }
}
