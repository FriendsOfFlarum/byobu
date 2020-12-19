import EventPost from "flarum/components/EventPost";

export default class RecipientLeft extends EventPost {
    static initAttrs(attrs) {
        super.initAttrs(attrs);
    }

    icon() {
        return app.forum.data.attributes['byobu.icon-postAction'];
    }

    descriptionKey() {
        return 'fof-byobu.forum.post.recipients_modified.removed_self';
    }
}
