import Search from "flarum/components/Search";
import RecipientSearchSource from "flagrow/byobu/components/RecipientSearchSource";
import ItemList from "flarum/utils/ItemList";
import classList from "flarum/utils/classList";
import extractText from "flarum/utils/extractText";
import LoadingIndicator from "flarum/components/LoadingIndicator";
import recipientLabel from "flagrow/byobu/helpers/recipientLabel";
import icon from 'flarum/helpers/icon';

export default class RecipientSearch extends Search {

    init() {
        super.init();

        console.log(this.props);
    }

    config(isInitialized) {
        if (isInitialized) return;

        const $search = this;

        this.$('.Search-results').on('click', (e) => {
            var target = this.$('.UserSearchResult.active');

            $search.addRecipient(target.data('index'));
        });

        super.config(isInitialized);
    }

    view() {
        if (typeof this.value() === 'undefined') {
            this.value('');
        }
        return (
            <div className="AddRecipientModal-form-input">
                <div className="RecipientsInput-selected">
                    {this.props.selected().toArray().map(recipient =>
                        <span className="RecipientsInput-tag" onclick={() => {
                            this.removeRecipient(recipient);
                        }}>
                        {recipientLabel(recipient)}
                      </span>
                    )}
                </div>
                <input className={'RecipientsInput FormControl ' + classList({
                    open: !!this.value(),
                    focused: !!this.value(),
                    active: !!this.value(),
                    loading: !!this.loadingSources
                })}
                       type="search"
                       placeholder={extractText(app.translator.trans('flagrow-byobu.forum.input.search_recipients'))}
                       value={this.value()}
                       oninput={m.withAttr('value', this.value)}
                       onfocus={() => this.hasFocus = true}
                       onblur={() => this.hasFocus = false}/>
                {this.loadingSources
                    ? LoadingIndicator.component({size: 'tiny', className: 'Button Button--icon Button--link'})
                    : this.value()
                        ? <button className="Search-clear Button Button--icon Button--link"
                                  onclick={this.clear.bind(this)}>{icon('times-circle')}</button>
                        : ''}

                <ul className="Dropdown-menu Search-results">
                    {this.value() && this.hasFocus
                        ? this.sources.map(source => source.view(this.value()))
                        : ''}
                </ul>
            </div>
        );
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
     * Navigate to the currently selected search result and close the list.
     */
    selectResult() {
        console.log({
            selectResult: true,
            value: this.value()
        });
        if (this.value()) {
            this.addRecipient(this.getItem(this.index));
        }
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

        m.redraw();
    }
    removeRecipient(recipient) {
        this.props.selected().remove(recipient.id());

        m.redraw();
    }

    findRecipient(id) {
        return app.store.getById('users', id);
    }
}
