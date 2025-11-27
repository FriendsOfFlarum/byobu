export default class RecipientSearch extends Search<import("flarum/forum/components/Search").SearchAttrs> {
    constructor();
    /**
     * Used to prevent duplicate IDs. Doesn't remove the possibility, but is extremely low.
     */
    inputUuid: any;
    oninit(vnode: any): void;
    oncreate(vnode: any): void;
    doSearch: boolean | undefined;
    typingTimer: NodeJS.Timeout | undefined;
    sources: import("flarum/forum/components/Search").SearchSource[] | undefined;
    /**
     * Build an item list of SearchSources.
     *
     * @return {ItemList}
     */
    sourceItems(): ItemList<any>;
    /**
     * Adds a recipient.
     *
     * @param value
     */
    addRecipient(value: any): void;
    /**
     * Removes a recipient.
     *
     * @param recipient
     */
    removeRecipient(recipient: any, e: any): void;
    /**
     * Loads a recipient from the global store.
     *
     * @param store
     * @param id
     * @returns {Model}
     */
    findRecipient(store: any, id: any): Model;
}
import Search from "flarum/forum/components/Search";
import ItemList from "flarum/common/utils/ItemList";
