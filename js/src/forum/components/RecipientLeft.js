import EventPost from "flarum/components/EventPost";

export default class RecipientLeft extends EventPost {
    static initProps(props) {
        super.initProps(props);
    }

    icon() {
        return 'far fa-map';
    }

    descriptionKey() {

        return 'fof-byobu.forum.post.recipients_modified.removed_self';
    }
}
