import Search from "flarum/components/Search";
import UserSearchSource from "./sources/UserSearchSource";
import GroupSearchSource from "./sources/GroupSearchSource";
import ItemList from "flarum/utils/ItemList";
import classList from "flarum/utils/classList";
import extractText from "flarum/utils/extractText";
import LoadingIndicator from "flarum/components/LoadingIndicator";
import recipientLabel from "../../common/helpers/recipientLabel";
import User from "flarum/models/User";
import Group from "flarum/models/Group";

export default class RecipientSearch extends Search {

    config(isInitialized) {
        if (isInitialized) return;

        const $search = this;

        this.$('.Search-results').on('click', (e) => {
            const target = this.$('.SearchResult.active')

            $search.addRecipient(target.data('index'));
            $search.$('.RecipientsInput').focus();
        });

        this.$('.Search-results').on('touchstart', (e) => {
            const target = this.$(e.target.parentNode);

            $search.addRecipient(target.data('index'));
            $search.$('.RecipientsInput').focus();
        });

        $('.RecipientsInput').on('keyup', () => {
            clearTimeout(this.typingTimer);
            this.doSearch = false;
            this.typingTimer = setTimeout(() => {
                this.doSearch = true;
                m.redraw();
            }, 900);
        }).on('keydown', () => {
            clearTimeout(this.typingTimer);
        });

        super.config(isInitialized);
    }

    view() {
        if (typeof this.value() === 'undefined') {
            this.value('');
        }

        const loading = this.value() && this.value().length >= 3;

        if (!this.sources) {
            this.sources = this.sourceItems().toArray();
        }

        return m('div', {
            className: 'AddRecipientModal-form-input'
        }, [
            m('div', {
                className: 'RecipientsInput-selected RecipientsLabel'
            }, this.props.selected().toArray().map(recipient =>
                recipientLabel(recipient, {
                    onclick: () => {
                        this.removeRecipient(recipient);
                    }
                })
            )),
            m('input', {
                className: 'RecipientsInput FormControl ' + classList({
                    open: !!this.value(),
                    focused: !!this.value(),
                    active: !!this.value(),
                    loading: !!this.loadingSources
                }),
                config: function (element) {
                    element.focus();
                },
                type: 'search',
                placeholder: extractText(app.translator.trans('fof-byobu.forum.input.search_recipients')),
                value: this.value(),
                oninput: m.withAttr('value', this.value),
                onfocus: () => this.hasFocus = true,
                onblur: () => this.hasFocus = false
            }),
            m('ul', {
                className: 'Dropdown-menu Search-results fade ' + classList({
                    in: !!loading
                })
            }, !this.doSearch
                ? LoadingIndicator.component({size: 'tiny', className: 'Button Button--icon Button--link'})
                : this.sources.map(source => source.view(this.value()))
            )
        ]);
    }

    /**
     * Build an item list of SearchSources.
     *
     * @return {ItemList}
     */
    sourceItems() {
        const items = new ItemList();

        // Add user source based on permissions.
        if (
            (!this.props.discussion && app.forum.attribute('canStartPrivateDiscussionWithUsers')) ||
            (this.props.discussion && this.props.discussion.canEditUserRecipients())
        ) {
            items.add('users', new UserSearchSource());
        }

        // Add group source based on permissions.
        if (
            (!this.props.discussion && app.forum.attribute('canStartPrivateDiscussionWithGroups')) ||
            (this.props.discussion && this.props.discussion.canEditGroupRecipients())
        ) {
            items.add('groups', new GroupSearchSource());
        }

        return items;
    }


    /**
     * Clear the search input and the current controller's active search.
     */
    clear() {
        this.value('');

        m.redraw();
    }

    /**
     * Adds a recipient.
     *
     * @param value
     */
    addRecipient(value) {

        let values = value.split(':'),
            type = values[0],
            id = values[1];

        let recipient = this.findRecipient(type, id);

        this.props.selected().add(value, recipient);

        this.clear();
    }

    /**
     * Removes a recipient.
     *
     * @param recipient
     */
    removeRecipient(recipient) {
        let type;

        if (recipient instanceof User) {
            type = 'users';
        }
        if (recipient instanceof Group) {
            type = 'groups';
        }

        this.props.selected().remove(type + ":" + recipient.id());

        m.redraw();
    }

    /**
     * Loads a recipient from the global store.
     *
     * @param store
     * @param id
     * @returns {Model}
     */
    findRecipient(store, id) {
        return app.store.getById(store, id);
    }
}
