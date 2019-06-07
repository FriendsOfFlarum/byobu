import Modal from "flarum/components/Modal";
import DiscussionPage from "flarum/components/DiscussionPage";
import Button from "flarum/components/Button";
import ItemList from "flarum/utils/ItemList";
import RecipientSearch from "./RecipientSearch";
import User from "flarum/models/User";
import Group from "flarum/models/Group";

export default class AddRecipientModal extends Modal {
    init() {
        super.init();

        this.selected = m.prop(new ItemList);

        if (this.props.discussion) {
            // Adds recipients of the currently viewed discussion.
            this.assignInitialRecipients(this.props.discussion);
        } else if (this.props.selectedRecipients.toArray().length > 0) {
            // Adds previously selected recipients.
            this.selected().merge(this.props.selectedRecipients);
        } else {
            // Adds the current user in case there are no selected recipients yet and this is a new discussion.
            this.selected().add("users:" + app.session.user.id(), app.session.user);
        }

        this.recipientSearch = RecipientSearch.component({
            selected: this.selected,
            discussion: this.props.discussion
        });
    }

    assignInitialRecipients(discussion) {
        discussion.recipientUsers().map(user => {
            this.selected().add("users:" + user.id(), user);
        });
        discussion.recipientGroups().map(group => {
            this.selected().add("groups:" + group.id(), group);
        });
    }

    className() {
        return 'AddRecipientModal';
    }

    title() {
        return this.props.discussion
            ? app.translator.trans('fof-byobu.forum.modal.titles.update_recipients', {title: <em>{this.props.discussion.title()}</em>})
            : app.translator.trans('fof-byobu.forum.modal.titles.add_recipients');
    }

    content() {

        return [
            <div className="Modal-body">
                <div className="AddRecipientModal-form">
                    {this.recipientSearch}
                    <div className="AddRecipientModal-form-submit App-primaryControl">
                        {Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            disabled: false,
                            icon: 'fas fa-check',
                            children: app.translator.trans('fof-byobu.forum.buttons.submit')
                        })}
                    </div>
                </div>
            </div>
        ];
    }

    select(e) {
        // Ctrl + Enter submits the selection, just Enter completes the current entry
        if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
            if (this.selected().length) {
                this.$('form').submit();
            }
        }
    }

    onsubmit(e) {
        e.preventDefault();

        const discussion = this.props.discussion;
        const recipients = this.selected();

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

        // Recipients are updated here for existing discussions here.
        if (discussion) {
            discussion.save({relationships: {recipientUsers, recipientGroups}})
                .then(() => {
                    if (app.current instanceof DiscussionPage) {
                        app.current.stream.update();
                    }
                    m.redraw();
                });
        }

        // Use the onsubmit callback to trigger an update in the DiscussionComposer
        if (this.props.onsubmit) this.props.onsubmit(recipients);

        app.modal.close();

        m.redraw.strategy('none');
    }
}
