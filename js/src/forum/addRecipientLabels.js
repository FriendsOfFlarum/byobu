import {extend} from "flarum/extend";
import DiscussionListItem from "flarum/components/DiscussionListItem";
import DiscussionPage from "flarum/components/DiscussionPage";
import DiscussionHero from "flarum/components/DiscussionHero";
import DiscussionList from "flarum/components/DiscussionList";
import recipientsLabel from "../common/helpers/recipientsLabel";

export default function() {

    const addToDiscussion = function(discussion, items, long) {
        let recipients = [];

        if (discussion.recipientUsers().length) {
            recipients = recipients.concat(discussion.recipientUsers());
        }

        if (discussion.recipientGroups().length) {
            recipients = recipients.concat(discussion.recipientGroups());
        }

        if (recipients && recipients.length) {
            if (long) {
                items.add('recipients', recipientsLabel(recipients), 10);
            } else {
                items.add('recipients', recipientsLabel(recipients, {link: true}), 4);
            }
        }
    };

    /**
     * Adds User labels on the discussion index page.
     */
    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;

        addToDiscussion(discussion, items, true);
    });

    /**
     * Require recipients from the API whenever we're loading a Discussion page.
     */
    extend(DiscussionPage.prototype, 'params', function(params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });
    extend(DiscussionList.prototype, 'requestParams', function(params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });


    /**
     * Adds User labels on the discussion Hero.
     */
    extend(DiscussionHero.prototype, 'items', function(items) {
        const discussion = this.props.discussion;

        addToDiscussion(discussion, items, false);
    });
}
