export default class PrivateDiscussionComposer extends DiscussionComposer {
    static initAttrs(attrs: any): void;
    /**
     * Tells other extensions that this composer is a Byobu composer.
     */
    _isByobuComposer: boolean;
    oninit(vnode: any): void;
    chooseRecipients(): void;
    addDefaultRecipients(username: any): void;
}
import DiscussionComposer from "flarum/forum/components/DiscussionComposer";
