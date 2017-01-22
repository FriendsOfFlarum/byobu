import Modal from 'flarum/components/Modal';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';
import highlight from 'flarum/helpers/highlight';
import classList from 'flarum/utils/classList';
import KeyboardNavigatable from 'flarum/utils/KeyboardNavigatable';
import RecipientSearch from 'flagrow/messaging/components/RecipientSearch';
import recipientLabel from 'flagrow/messaging/helpers/recipientLabel';

export default class AddRecipientModal extends Modal {
    init() {
        super.init();

        this.selected = [];
        this.filter = m.prop('');
        this.index = null;
        this.focused = false;
        this.recipients = [];

        if (this.props.selectedRecipients) {
            this.props.selectedRecipients.map(this.addRecipient.bind(this));
        } else if (this.props.discussion) {
            this.props.discussion.recipients().map(this.addRecipient.bind(this));
        }

        this.navigator = new KeyboardNavigatable();
        this.navigator
            .onUp(() => this.setIndex(this.getCurrentNumericIndex() - 1, true))
            .onDown(() => this.setIndex(this.getCurrentNumericIndex() + 1, true))
            .onSelect(this.select.bind(this))
            .onRemove(() => this.selected.splice(this.selected.length - 1, 1));
    }

    addRecipient(recipient) {

        this.selected.push(recipient);
    }
    removeRecipient(recipient) {
        const index = this.selected.indexOf(recipient);
    }

    className() {
        return 'AddRecipientModal';
    }

    title() {
        return this.props.discussion
            ? app.translator.trans('flarum-tags.forum.choose_tags.edit_title', {title: <em>{this.props.discussion.title()}</em>})
            : app.translator.trans('flarum-tags.forum.choose_tags.title');
    }

    content() {
        let recipients = this.recipients;
        const filter = this.filter().toLowerCase();

        // Filter out all child tags whose parents have not been selected. This
        // makes it impossible to select a child if its parent hasn't been selected.
        // tags = tags.filter(tag => {
        //     const parent = tag.parent();
        //     return parent === false || this.selected.indexOf(parent) !== -1;
        // });


        // If the user has entered text in the filter input, then filter by tags
        // whose name matches what they've entered.
        if (filter) {
            recipients = recipients.filter(recipient => recipient.name().substr(0, filter.length).toLowerCase() === filter);
        }

        if (recipients.indexOf(this.index) === -1) this.index = recipients[0];

        return [
            <div className="Modal-body">
                <div className="AddRecipientModal-form">
                    <div className="AddRecipientModal-form-input">
                        <div className={'TagsInput FormControl ' + (this.focused ? 'focus' : '')}>
              <span className="TagsInput-selected">
                {this.selected.map(recipient =>
                    <span className="TagsInput-tag" onclick={() => {
                        this.removeRecipient(recipient);
                        this.onready();
                    }}>
                    {recipientLabel(recipient)}
                  </span>
                )}
              </span>
                            {RecipientSearch.component()}
                        </div>
                    </div>
                    <div className="AddRecipientModal-form-submit App-primaryControl">
                        {Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            disabled: false,
                            icon: 'check',
                            children: app.translator.trans('flarum-tags.forum.choose_tags.submit_button')
                        })}
                    </div>
                </div>
            </div>,

            <div className="Modal-footer">
                <ul className="AddRecipientModal-list SelectTagList">
                    {recipients
                        .map(recipient => (
                            <li data-index={recipient.id()}
                                className={classList({
                                    selected: this.selected.indexOf(recipient) !== -1,
                                    active: this.index === recipient
                                })}
                                onmouseover={() => this.index = recipient}
                                onclick={this.toggleRecipient.bind(this, recipient)}
                            >
                                {tagIcon(tag)}
                                <span className="SelectTagListItem-name">
                  {highlight(tag.name(), filter)}
                </span>
                                {tag.description()
                                    ? (
                                        <span className="SelectTagListItem-description">
                      {tag.description()}
                    </span>
                                    ) : ''}
                            </li>
                        ))}
                </ul>
            </div>
        ];
    }

    toggleRecipient(recipient) {
        const index = this.selected.indexOf(recipient);

        if (index !== -1) {
            this.removeRecipient(recipient);
        } else {
            this.addRecipient(recipient);
        }

        if (this.filter()) {
            this.filter('');
            this.index = this.recipients[0];
        }

        this.onready();
    }

    select(e) {
        // Ctrl + Enter submits the selection, just Enter completes the current entry
        if (e.metaKey || e.ctrlKey || this.selected.indexOf(this.index) !== -1) {
            if (this.selected.length) {
                this.$('form').submit();
            }
        } else {
            this.getItem(this.index)[0].dispatchEvent(new Event('click'));
        }
    }

    selectableItems() {
        return this.$('.AddRecipientModal-list > li');
    }

    getCurrentNumericIndex() {
        return this.selectableItems().index(
            this.getItem(this.index)
        );
    }

    getItem(index) {
        return this.selectableItems().filter(`[data-index="${index.id()}"]`);
    }

    setIndex(index, scrollToItem) {
        const $items = this.selectableItems();
        const $dropdown = $items.parent();

        if (index < 0) {
            index = $items.length - 1;
        } else if (index >= $items.length) {
            index = 0;
        }

        const $item = $items.eq(index);

        this.index = app.store.getById('tags', $item.attr('data-index'));

        m.redraw();

        if (scrollToItem) {
            const dropdownScroll = $dropdown.scrollTop();
            const dropdownTop = $dropdown.offset().top;
            const dropdownBottom = dropdownTop + $dropdown.outerHeight();
            const itemTop = $item.offset().top;
            const itemBottom = itemTop + $item.outerHeight();

            let scrollTop;
            if (itemTop < dropdownTop) {
                scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
            } else if (itemBottom > dropdownBottom) {
                scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
            }

            if (typeof scrollTop !== 'undefined') {
                $dropdown.stop(true).animate({scrollTop}, 100);
            }
        }
    }

    onsubmit(e) {
        e.preventDefault();

        const discussion = this.props.discussion;
        const recipients = this.selected;

        if (discussion) {
            discussion.save({relationships: {recipients}})
                .then(() => {
                    if (app.current instanceof DiscussionPage) {
                        app.current.stream.update();
                    }
                    m.redraw();
                });
        }

        if (this.props.onsubmit) this.props.onsubmit(tags);

        app.modal.close();

        m.redraw.strategy('none');
    }
}
