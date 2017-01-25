import Modal from 'flarum/components/Modal';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';
import ItemList from "flarum/utils/ItemList";
import RecipientSearch from 'flagrow/byobu/components/RecipientSearch';

export default class AddRecipientModal extends Modal {
    init() {
        super.init();

        this.selected = m.prop(new ItemList);

        if (this.props.selectedRecipients) {
            this.props.selectedRecipients.map(recipient => {
                this.selected().add(recipient.id, recipient);
            });
        } else if (this.props.discussion) {
            this.props.discussion.recipients().map(recipient => {
                this.selected().add(recipient.id(), recipient);
            });
        }

        console.log(this.selected().toArray());

        this.recipientSearch = RecipientSearch.component({
            selected: this.selected
        });
    }

    className() {
        return 'AddRecipientModal';
    }

    title() {
        return this.props.discussion
            ? app.translator.trans('flagrow-byobu.forum.modal.titles.update_recipients', {title: <em>{this.props.discussion.title()}</em>})
            : app.translator.trans('flagrow-byobu.forum.modal.titles.add_recipients');
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
                            icon: 'check',
                            children: app.translator.trans('flagrow-byobu.forum.buttons.submit')
                        })}
                    </div>
                </div>
            </div>
        ];
    }

    select(e) {
        // Ctrl + Enter submits the selection, just Enter completes the current entry
        if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
            if (this.selected.length) {
                this.$('form').submit();
            }
        }
    }

    onsubmit(e) {
        e.preventDefault();

        const discussion = this.props.discussion;
        const recipients = this.selected().toArray();

        if (discussion) {
            discussion.save({relationships: {recipients}})
                .then(() => {
                    if (app.current instanceof DiscussionPage) {
                        app.current.stream.update();
                    }
                    m.redraw();
                });
        }

        if (this.props.onsubmit) this.props.onsubmit(recipients);

        app.modal.close();

        m.redraw.strategy('none');
    }
}
