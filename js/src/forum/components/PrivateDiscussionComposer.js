import DiscussionComposer from 'flarum/components/DiscussionComposer';
import AddRecipientModal from './AddRecipientModal';
import ItemList from 'flarum/utils/ItemList';
import recipientCountLabel from "../../common/helpers/recipientCountLabel";

export default class PrivateDiscussionComposer extends DiscussionComposer {
    oninit(vnode) {
        super.oninit(vnode);

        this.recipients = this.attrs.recipients || new ItemList();

        this.recipientUsers = this.attrs.recipientUsers || [];
        this.recipientGroups = this.attrs.recipientGroups || [];

        const username = m.route.param('username');

        if (typeof username !== 'undefined') {
            this.addDefaultRecipients(username);
        }
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        if (this.recipients.length < 0) {
            this.chooseRecipients();
        }
    }

    data() {
        let data = super.data();

        const users = [];
        const groups = [];
        this.recipients.forEach((recipient) => {
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

        return data;
    }

    chooseRecipients() {
        app.modal.show(AddRecipientModal, {
            selectedRecipients: this.recipients,
            onsubmit: (recipients) => {
                this.recipients = recipients;

                // Focus on recipient autocomplete field.
                this.$('.RecipientsInput').focus();
            },
        });
    }

    headerItems() {
        let items = super.headerItems();

        items.remove('tags');

        if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
            const recipients = this.recipients;

            items.add(
                'recipients',
                <a className="PrivateDiscussionComposer-changeRecipients" onclick={this.chooseRecipients.bind(this)}>
                    {recipients.length ? (
                        recipientCountLabel(recipients.length)
                    ) : (
                        <span className="RecipientLabel none">{app.translator.trans('fof-byobu.forum.buttons.add_recipients')}</span>
                    )}
                </a>,
                5
            );
        }

        return items;
    }

    addDefaultRecipients(username) {
        const user = app.store.getBy('users', 'username', username);

        this.recipients.add('users:' + app.session.user.id(), app.session.user);

        if (user.id() !== app.session.user.id()) {
            this.recipients.add('users:' + user.id(), user);
        }
    };

    onsubmit() {
        this.loading = true;

        const recipients = this.recipients.toArray();

        if (recipients.length < 2) {
            app.modal.show(AddRecipientModal, { selectedRecipients: recipients });

            this.loading = false;
        } else {
            const data = this.data();

            app.store
                .createRecord('discussions')
                .save(data)
                .then((discussion) => {
                    if (app.cache.discussionList) {
                        app.cache.discussionList.refresh();
                    }
                    m.route.set(app.route.discussion(discussion));

                    app.composer.hide();
                }, this.loaded.bind(this));
        }
    }
}
