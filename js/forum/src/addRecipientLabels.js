import { extend } from 'flarum/extend';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionPage from 'flarum/components/DiscussionPage';
import DiscussionHero from 'flarum/components/DiscussionHero';

import recipientsLabel from "flagrow/byobu/helpers/recipientsLabel";

export default function() {

    /**
     * Adds User labels on the discussion index page.
     */
    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const recipients = this.props.discussion.recipients();

        if (recipients && recipients.length) {
            items.add('recipients', recipientsLabel(recipients), 20);
        }
    });

    /**
     * Require recipients from the API whenever we're loading a Discussion page.
     */
    extend(DiscussionPage.prototype, 'params', function(params) {
        params.include.push('recipients');
    });


    /**
     * Adds User labels on the discussion Hero.
     */
    extend(DiscussionHero.prototype, 'items', function(items) {
        const recipients = this.props.discussion.recipients();

        if (recipients && recipients.length) {
            items.remove('tags');
            items.add('recipients', recipientsLabel(recipients, {link: true}), 4);
        }
    });
}
