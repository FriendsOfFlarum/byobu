import EventPost from 'flarum/forum/components/EventPost';
export default class MadePublic extends EventPost {
    static initAttrs(attrs: any): void;
    icon(): string;
    descriptionKey(): string;
}
