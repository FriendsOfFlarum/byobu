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

import PrivateDiscussionIndex from "./components/PrivateDiscussionIndex";
import RecipientsModified from "./components/RecipientsModified";

app.initializers.add('fof-byobu', function(app) {
    app.routes.private_discussions = {path: '/private-discussions', component: PrivateDiscussionIndex.component()};

    Discussion.prototype.recipientUsers = Model.hasMany('recipientUsers');
    Discussion.prototype.oldRecipientUsers = Model.hasMany('oldRecipientUsers');
    Discussion.prototype.recipientGroups = Model.hasMany('recipientGroups');
    Discussion.prototype.oldRecipientGroups = Model.hasMany('oldRecipientGroups');

    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');
    Discussion.prototype.canEditUserRecipients = Model.attribute('canEditUserRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');

    User.prototype.blocksPd = Model.attribute('blocksPd');
    User.prototype.cannotBeDirectMessaged = Model.attribute('cannotBeDirectMessaged');

    app.postComponents.recipientsModified = RecipientsModified;

    addRecipientComposer(app);
    addRecipientLabels();
    addRecipientsControl();
    addHasRecipientsBadge();
    addPrivacySetting();

    addDiscussPrivatelyControl();

    addPrivateDiscussionsPage();
});
