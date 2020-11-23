import Search from 'flarum/components/Search';
import UserSearchSource from './sources/UserSearchSource';
import GroupSearchSource from './sources/GroupSearchSource';
import ItemList from 'flarum/utils/ItemList';
import classList from 'flarum/utils/classList';
import extractText from 'flarum/utils/extractText';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import recipientLabel from '../pages/labels/recipientLabel';
import User from 'flarum/models/User';
import Group from 'flarum/models/Group';

export default class RecipientSearch extends Search {
    oncreate(vnode) {
        super.oncreate(vnode);

        const $search = this;

        this.$('.Search-results').on('click', (e) => {
            const target = this.$('.SearchResult.active');

            $search.addRecipient(target.data('index'));
            $search.$('.RecipientsInput').focus();
        });

        this.$('.Search-results').on('touchstart', (e) => {
            const target = this.$(e.target.parentNode);

            $search.addRecipient(target.data('index'));
            $search.$('.RecipientsInput').focus();
        });

        $('.RecipientsInput')
            .on('keyup', () => {
                clearTimeout(this.typingTimer);
                this.doSearch = false;
                this.typingTimer = setTimeout(() => {
                    this.doSearch = true;
                    m.redraw();
                }, 900);
            })
            .on('keydown', () => {
                clearTimeout(this.typingTimer);
            });


        super.oncreate(vnode);
    }

    view() {
        if (typeof this.state.getValue() === 'undefined') {
            this.state.setValue('');
        }

        const loading = this.state.getValue() && this.state.getValue().length >= 3;

        if (!this.sources) {
            this.sources = this.sourceItems().toArray();
        }

        return m(
            'div',
            {
                className: 'AddRecipientModal-form-input',
            },
            [
                m(
                    'div',
                    {
                        className: 'RecipientsInput-selected RecipientsLabel',
                    },
                    this.attrs
                        .selected()
                        .toArray()
                        .map((recipient) =>
                            recipientLabel(recipient, {
                                onclick: (e) => this.removeRecipient(recipient, e)
                            })
                        )
                ),
                m('input', {
                    className:
                        'RecipientsInput FormControl ' +
                        classList({
                            open: !!this.state.getValue(),
                            focused: !!this.state.getValue(),
                            active: !!this.state.getValue(),
                            loading: !!this.loadingSources,
                        }),
                    oncreate: function (vnode) {
                        vnode.dom.focus();
                    },
                    type: 'search',
                    placeholder: extractText(app.translator.trans('fof-byobu.forum.input.search_recipients')),
                    value: this.state.getValue(),
                    oninput: e => this.state.setValue(e.target.value),
                    onfocus: () => (this.hasFocus = true),
                    onblur: () => (this.hasFocus = false),
                }),
                m(
                    'ul',
                    {
                        className:
                            'Dropdown-menu Search-results fade ' +
                            classList({
                                in: !!loading,
                            }),
                    },
                    !this.doSearch
                        ? LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' })
                        : this.sources.map((source) => source.view(this.state.getValue()))
                ),
            ]
        );
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
            (!this.attrs.discussion && app.forum.attribute('canStartPrivateDiscussionWithUsers')) ||
            (this.attrs.discussion && this.attrs.discussion.canEditUserRecipients())
        ) {
            items.add('users', new UserSearchSource());
        }

        // Add group source based on permissions.
        if (
            (!this.attrs.discussion && app.forum.attribute('canStartPrivateDiscussionWithGroups')) ||
            (this.attrs.discussion && this.attrs.discussion.canEditGroupRecipients())
        ) {
            items.add('groups', new GroupSearchSource());
        }

        return items;
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

        this.attrs.selected().add(value, recipient);

        this.state.clear();
    }

    /**
     * Removes a recipient.
     *
     * @param recipient
     */
    removeRecipient(recipient, e) {
        e.preventDefault();

        let type;

        if (recipient instanceof User) {
            type = 'users';
        }
        if (recipient instanceof Group) {
            type = 'groups';
        }

        this.attrs.selected().remove(type + ':' + recipient.id());
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
