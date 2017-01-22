import Search from 'flarum/components/Search';
import RecipientSearchSource from 'flagrow/messaging/components/RecipientSearchSource';
import ItemList from 'flarum/utils/ItemList';
import classList from 'flarum/utils/classList';
import extractText from 'flarum/utils/extractText';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class RecipientSearch extends Search
{
    init() {
        super.init();

        this.recipients = new ItemList();
    }

    view() {
        const currentSearch = this.getCurrentSearch();

        // Initialize search input value in the view rather than the constructor so
        // that we have access to app.current.
        if (typeof this.value() === 'undefined') {
            this.value(currentSearch || '');
        }

        return (
            <div className={'Search ' + classList({
                open: this.value() && this.hasFocus,
                focused: this.hasFocus,
                active: !!currentSearch,
                loading: !!this.loadingSources
            })}>
                <div className="Search-input">
                    <input className="FormControl"
                           type="search"
                           placeholder={extractText(app.translator.trans('flagrow-messaging.forum.recipient_modal.search_placeholder'))}
                           value={this.value()}
                           oninput={m.withAttr('value', this.value)}
                           onfocus={() => this.hasFocus = true}
                           onblur={() => this.hasFocus = false}/>
                    {this.loadingSources
                        ? LoadingIndicator.component({size: 'tiny', className: 'Button Button--icon Button--link'})
                        : currentSearch
                            ? <button className="Search-clear Button Button--icon Button--link" onclick={this.clear.bind(this)}>{icon('times-circle')}</button>
                            : ''}
                </div>
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

        console.error('foo');

        if (this.value()) {
            console.log(this.getItem(this.index));
        } else {
            this.clear();
        }

        this.$('input').blur();
    }
}
