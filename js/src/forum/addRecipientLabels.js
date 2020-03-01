import { extend } from "flarum/extend";
import DiscussionListItem from "flarum/components/DiscussionListItem";
import DiscussionPage from "flarum/components/DiscussionPage";
import DiscussionHero from "flarum/components/DiscussionHero";
import DiscussionList from "flarum/components/DiscussionList";
import recipientsLabel from "../common/helpers/recipientsLabel";

export default function () {

    const addToDiscussion = function (discussion, items, long) {
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
                items.add('recipients', recipientsLabel(recipients, { link: true }), 4);
            }
        }
    };

    /**
     * Adds User labels on the discussion index page.
     */
    extend(DiscussionListItem.prototype, 'infoItems', function (items) {
        const discussion = this.props.discussion;

        addToDiscussion(discussion, items, true);
    });

    /**
     * Require recipients from the API whenever we're loading a Discussion page.
     */
    extend(DiscussionPage.prototype, 'params', function (params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });
    extend(DiscussionList.prototype, 'requestParams', function (params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });


    /**
     * Adds User labels on the discussion Hero.
     */
    extend(DiscussionHero.prototype, 'items', function (items) {
        const discussion = this.props.discussion;

        addToDiscussion(discussion, items, false);
    });

    /**
     * Adds 'hasPrivateMessages' to the class, if we're looking at a private discussion.
     */
    extend(DiscussionHero.prototype, 'config', function (isInitialized, context, items) {
        if (isInitialized || context || !app.forum.attribute('byobuTag')) {
            return;
        }

        const { discussion } = this.props;

        if (discussion.recipientUsers().length || discussion.recipientGroups().length) {
            const items = document.getElementsByClassName('DiscussionHero-items');
            const { children } = items[0];
            const recipients = 'item-recipients';

            const classes = [];
            Object.keys(children).forEach(item => {
                classes.push(children[item].className);
            });

            const privateDiscussion = classes.filter(i => i === recipients);

            if (privateDiscussion.length) {
                items[0].className = `${items[0].className} isPrivateDiscussion`;
            }
        }
    });

    /**
     * Remove tag from private discussions in discussion list
     */
    extend(DiscussionListItem.prototype, 'config', (isInitialized, context) => {
        if (isInitialized || context || !app.forum.attribute('byobuTag')) {
          return;
        }

        const tagsClassName = '.item-tags';
        const recipientsClassName = '.DiscussionListItem-info > .item-recipients';

        $(recipientsClassName).prev(tagsClassName).css('display', 'none');
      });
}
