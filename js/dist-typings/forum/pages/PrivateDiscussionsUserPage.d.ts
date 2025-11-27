export default class PrivateDiscussionsUserPage extends UserPage<import("flarum/forum/components/UserPage").IUserPageAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    show(user: any): void;
    list: PrivateDiscussionListState | undefined;
    handleChangeSort(sort: any, e: any): void;
    changeSort(sort: any): void;
    sort: any;
    content(): JSX.Element;
    actionItems(): ItemList<any>;
    viewItems(): ItemList<any>;
}
import UserPage from "flarum/forum/components/UserPage";
import PrivateDiscussionListState from "../states/PrivateDiscussionListState";
import ItemList from "flarum/common/utils/ItemList";
