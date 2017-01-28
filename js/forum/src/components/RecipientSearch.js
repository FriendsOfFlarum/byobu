import Search from "flarum/components/Search";
import UserSearchSource from "flagrow/byobu/components/UserSearchSource";
import GroupSearchSource from "flagrow/byobu/components/GroupSearchSource";
import ItemList from "flarum/utils/ItemList";
import classList from "flarum/utils/classList";
import extractText from "flarum/utils/extractText";
import LoadingIndicator from "flarum/components/LoadingIndicator";
import recipientLabel from "flagrow/byobu/helpers/recipientLabel";

export default class RecipientSearch extends Search {

    config(isInitialized) {
        if (isInitialized) return;

        const $search = this;

        this.$('.Search-results').on('click', (e) => {
            var target = this.$('.SearchResult.active');

            $search.addRecipient(target.data('index'));

            $search.$('.RecipientsInput').focus();
        });

        super.config(isInitialized);
    }

    view() {
        if (typeof this.value() === 'undefined') {
            this.value('');
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
                placeholder: extractText(app.translator.trans('flagrow-byobu.forum.input.search_recipients')),
                value: this.value(),
                oninput: m.withAttr('value', this.value),
                onfocus: () => this.hasFocus = true,
                onblur: () => this.hasFocus = false
            }),
            m('ul', {
                className: 'Dropdown-menu Search-results'
            }, this.value() && this.value().length >= 3
                ? this.sources.map(source => source.view(this.value()))
                : LoadingIndicator.component({size: 'tiny', className: 'Button Button--icon Button--link'})
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

        items.add('users', new UserSearchSource());
        items.add('groups', new GroupSearchSource());

        return items;
    }


    /**
     * Clear the search input and the current controller's active search.
     */
    clear() {
        this.value('');

        m.redraw();
    }

    addRecipient(value) {

        var values = value.split(':'),
            type = values[0],
            id = values[1];

        var recipient = this.findRecipient(type, id);

        this.props.selected().add(value, recipient);

        this.clear();
    }
    removeRecipient(recipient) {
        this.props.selected().remove(recipient.id());

        m.redraw();
    }

    findRecipient(store, id) {
        return app.store.getById(store, id);
    }
}
