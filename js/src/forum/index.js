import { extend } from 'flarum/extend';
import Model from "flarum/Model";
import Discussion from "flarum/models/Discussion";
import User from "flarum/models/User";
import addRecipientComposer from "./addRecipientComposer";
import addRecipientLabels from "./addRecipientLabels";
import addRecipientsControl from "./addRecipientsControl";
import addHasRecipientsBadge from "./addHasRecipientsBadge";
import addDiscussPrivatelyControl from './addDiscussPrivatelyControl';
import addPrivacySetting from './addPrivacySetting';
import addPrivateDiscussionsPage from "./addPrivateDiscussionsPage";
import NotificationGrid from 'flarum/components/NotificationGrid';
import PrivateDiscussionNotification from './components/PrivateDiscussionNotification';
import PrivateDiscussionRepliedNotification from './components/PrivateDiscussionReplyNotification';
import PrivateDiscussionUserLeftNotification from './components/PrivateDiscussionUserLeftNotification';
import PrivateDiscussionAddedNotification from './components/PrivateDiscussionAddedNotification';
import PrivateDiscussionIndex from "./components/PrivateDiscussionIndex";
import RecipientsModified from "./components/RecipientsModified";
import RecipientLeft from './components/RecipientLeft';
import addPrivateDiscussionSessionDropdown from './addPrivateDiscussionsToSessionDropdown';

app.initializers.add('fof-byobu', function (app) {
    app.routes.private_discussions = { path: '/private-discussions', component: PrivateDiscussionIndex.component() };

    Discussion.prototype.recipientUsers = Model.hasMany('recipientUsers');
    Discussion.prototype.oldRecipientUsers = Model.hasMany('oldRecipientUsers');
    Discussion.prototype.recipientGroups = Model.hasMany('recipientGroups');
    Discussion.prototype.oldRecipientGroups = Model.hasMany('oldRecipientGroups');

    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');
    Discussion.prototype.canEditUserRecipients = Model.attribute('canEditUserRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');
    Discussion.prototype.canMakePublic = Model.attribute('canMakePublic');

    User.prototype.blocksPd = Model.attribute('blocksPd');
    User.prototype.cannotBeDirectMessaged = Model.attribute('cannotBeDirectMessaged');

    app.postComponents.recipientsModified = RecipientsModified;
    app.postComponents.recipientLeft = RecipientLeft;

    addRecipientComposer(app);
    addRecipientLabels();
    addRecipientsControl();
    addHasRecipientsBadge();
    addPrivacySetting();

    addDiscussPrivatelyControl();

    addPrivateDiscussionsPage();
    addPrivateDiscussionSessionDropdown();

    app.notificationComponents.byobuPrivateDiscussionCreated = PrivateDiscussionNotification;
    app.notificationComponents.byobuPrivateDiscussionReplied = PrivateDiscussionRepliedNotification;
    app.notificationComponents.byobuRecipientRemoved = PrivateDiscussionUserLeftNotification;
    app.notificationComponents.byobuPrivateDiscussionAdded = PrivateDiscussionAddedNotification;

    // Add notification preferences.
    extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
        items.add('byobuPrivateDiscussionCreated', {
            name: 'byobuPrivateDiscussionCreated',
            icon: 'fas fa-map',
            label: app.translator.trans('fof-byobu.forum.notifications.pd_label')
        });
        items.add('byobuPrivateDiscussionReplied', {
            name: 'byobuPrivateDiscussionReplied',
            icon: 'fas fa-map',
            label: app.translator.trans('fof-byobu.forum.notifications.pd_reply_label')
        });
        items.add('byobuPrivateDiscussionAdded', {
            name: 'byobuPrivateDiscussionAdded',
            icon: 'fas fa-map',
            label: app.translator.trans('fof-byobu.forum.notifications.pd_added_label')
        });
        items.add('byobuRecipientRemoved', {
            name: 'byobuRecipientRemoved',
            icon: 'fas fa-map',
            label: app.translator.trans('fof-byobu.forum.notifications.pd_user_left_label')
        });
    });
});
