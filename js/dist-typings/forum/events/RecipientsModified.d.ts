export default class RecipientsModified extends EventPost {
    static initAttrs(attrs: any): void;
    icon(): unknown;
    descriptionData(): {
        added: JSX.Element;
        removed: JSX.Element;
    };
}
import EventPost from "flarum/forum/components/EventPost";
