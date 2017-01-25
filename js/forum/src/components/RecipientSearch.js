import Search from "flarum/components/Search";
import RecipientSearchSource from "flagrow/byobu/components/RecipientSearchSource";
import ItemList from "flarum/utils/ItemList";
import classList from "flarum/utils/classList";
import extractText from "flarum/utils/extractText";
import LoadingIndicator from "flarum/components/LoadingIndicator";
import recipientLabel from "flagrow/byobu/helpers/recipientLabel";
import icon from 'flarum/helpers/icon';

export default class RecipientSearch extends Search {

    config(isInitialized) {
        if (isInitialized) return;

        const $search = this;

        this.$('.Search-results').on('click', (e) => {
            var target = this.$('.UserSearchResult.active');

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

        items.add('recipients', new RecipientSearchSource());

        return items;
    }


    /**
     * Clear the search input and the current controller's active search.
     */
    clear() {
        this.value('');

        m.redraw();
    }

    addRecipient(id) {
        var recipient = this.findRecipient(id);

        this.props.selected().add(id, recipient);

        this.clear();
    }
    removeRecipient(recipient) {
        this.props.selected().remove(recipient.id());

        m.redraw();
    }

    findRecipient(id) {
        return app.store.getById('users', id);
    }
}
