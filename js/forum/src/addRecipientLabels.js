import { extend } from 'flarum/extend';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionPage from 'flarum/components/DiscussionPage';
import DiscussionHero from 'flarum/components/DiscussionHero';

import recipientsLabel from "flagrow/messaging/helpers/recipientsLabel";

export default function() {

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const recipients = this.props.discussion.recipients();

        if (recipients && recipients.length) {
            items.add('recipients', recipientsLabel(recipients), 20);
        }
    });

    extend(DiscussionPage.prototype, 'params', function(params) {
        params.include.push('recipients');
    });


    extend(DiscussionHero.prototype, 'items', function(items) {
        const recipients = this.props.discussion.recipients();

        if (recipients && recipients.length) {
            items.add('recipients', recipientsLabel(recipients, {link: true}), 4);
        }
    });
}
