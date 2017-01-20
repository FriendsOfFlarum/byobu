import Search from 'flarum/components/Search';
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import ItemList from 'flarum/utils/ItemList';

export default class RecipientSearch extends Search
{


    /**
     * Build an item list of SearchSources.
     *
     * @return {ItemList}
     */
    sourceItems() {
        const items = new ItemList();

        items.add('users', new UsersSearchSource());

        return items;
    }

    /**
     * Navigate to the currently selected search result and close the list.
     */
    selectResult() {
        if (this.value()) {
            console.log(this.value());
        } else {
            this.clear();
        }

        this.$('input').blur();
    }
}
