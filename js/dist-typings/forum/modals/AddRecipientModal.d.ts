export default class AddRecipientModal extends FormModal<import("flarum/common/components/FormModal").IFormModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    selected: any;
    recipientSearch: SearchState | undefined;
    isDismissible(): boolean;
    assignInitialRecipients(discussion: any): void;
    title(): string | any[];
    helpText(): string | any[];
    content(): JSX.Element[];
    select(e: any): void;
    onsubmit(e: any): void;
}
import FormModal from "flarum/common/components/FormModal";
import SearchState from "flarum/common/states/SearchState";
