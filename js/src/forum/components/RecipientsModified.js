import EventPost from "flarum/components/EventPost";
import recipientsLabel from "../../common/helpers/recipientsLabel";

export default class RecipientsModified extends EventPost {
    static initProps(props) {
        super.initProps(props);

        function diff(diff1, diff2, store) {
            return diff1
                .filter(item => diff2.indexOf(item) === -1)
                .map(id => app.store.getById(store, id));
        }

        const content = props.post.content();

        // For event posts existing before groups functionality.
        if (!content['new'] && content.length == 2) {
            const oldRecipients = props.post.content()[0];
            const newRecipients = props.post.content()[1];
            props.added = diff(newRecipients, oldRecipients, 'users');
            props.removed = diff(oldRecipients, newRecipients, 'users');
        } else {
            var usersAdded = diff(content['new']['users'], content['old']['users'], 'users');
            var usersRemoved = diff(content['old']['users'], content['new']['users'], 'users');
            var groupsAdded = diff(content['new']['groups'], content['old']['groups'], 'groups');
            var groupsRemoved = diff(content['old']['groups'], content['new']['groups'], 'groups');

            props.added = usersAdded.concat(groupsAdded);
            props.removed = usersRemoved.concat(groupsRemoved);
        }
    }

    icon() {
        return 'far fa-map';
    }

    descriptionKey() {

        var localeBase = 'fof-byobu.forum.post.recipients_modified.';

        if (this.props.added.length) {
            if (this.props.removed.length) {
                return localeBase + 'added_and_removed';
            }

            return localeBase + 'added';
        }

        return localeBase + 'removed';
    }

    descriptionData() {
        const data = {};

        if (this.props.added.length) {
            data.added = recipientsLabel(this.props.added, {link: true});
        }

        if (this.props.removed.length) {
            data.removed = recipientsLabel(this.props.removed, {link: true});
        }

        return data;
    }
}
