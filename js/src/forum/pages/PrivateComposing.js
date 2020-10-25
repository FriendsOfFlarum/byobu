
import Button from 'flarum/components/Button';
import LogInModal from 'flarum/components/LogInModal';
import ItemList from 'flarum/utils/ItemList';
import PrivateDiscussionComposer from "./discussions/PrivateDiscussionComposer";

export default class PrivateComposing {
    constructor(recipient) {
        this.recipient = recipient;
    }

    action(e) {
        e.preventDefault();

        return new Promise((resolve, reject) => {
            if (app.session.user) {
                let recipients = new ItemList();

                recipients.add('users:' + app.session.user.id(), app.session.user);

                if (this.recipient && app.session.user.id() !== this.recipient.id()) {
                    recipients.add('users:' + this.recipient.id(), this.recipient);
                }

                app.composer.load(PrivateDiscussionComposer, {
                    user: app.session.user,
                    recipients: recipients,
                    recipientUsers: recipients,
                    titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
                    submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button'),
                });

                app.composer.show();

                return resolve();
            } else {
                app.modal.show(LogInModal);

                return reject();
            }
        });
    }

    component() {
        return Button.component({
            icon: 'fas fa-pen',
            className: 'Button Button--primary IndexPage-newDiscussion',
            itemClassName: 'fof-byobu_primaryControl',
            onclick: this.action.bind(this),
            disabled: ! this.canStartDiscussion,
        }, app.translator.trans(
            this.canStartDiscussion ? 'fof-byobu.forum.nav.start_button' : 'core.forum.index.cannot_start_discussion_button'
        ))
    }

    get canStartDiscussion() {
        return app.session.user && app.forum.attribute('canStartPrivateDiscussion');
    }
}
