import EventPost from 'flarum/components/EventPost';

export default class RecipientLeft extends EventPost {
    static initAttrs(attrs) {
        super.initAttrs(attrs);
    }

    icon() {
        return 'far fa-map';
    }

    descriptionKey() {
        return 'fof-byobu.forum.post.recipients_modified.removed_self';
    }
}
