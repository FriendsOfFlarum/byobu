import EventPost from "flarum/components/EventPost";
import recipientsLabel from "flagrow/byobu/helpers/recipientsLabel";

export default class RecipientsModified extends EventPost {
    static initProps(props) {
        super.initProps(props);

        const oldRecipients = props.post.content()[0];
        const newRecipients = props.post.content()[1];

        function diff(diff1, diff2) {
            return diff1
                .filter(item => diff2.indexOf(item) === -1)
                .map(id => app.store.getById('users', id));
        }

        props.added = diff(newRecipients, oldRecipients);
        props.removed = diff(oldRecipients, newRecipients);
    }

    icon() {
        return 'map-o';
    }

    descriptionKey() {

        var localeBase = 'flagrow-byobu.forum.post.recipients_modified.';

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
