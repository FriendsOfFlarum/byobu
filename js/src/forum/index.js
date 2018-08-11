import Model from "flarum/Model";
import Discussion from "flarum/models/Discussion";
import addRecipientComposer from "./addRecipientComposer";
import addRecipientLabels from "./addRecipientLabels";
import addRecipientsControl from "./addRecipientsControl";
import addHasRecipientsBadge from "./addHasRecipientsBadge";
import addDiscussPrivatelyControl from './addDiscussPrivatelyControl';

import PrivateDiscussionIndex from "./components/PrivateDiscussionIndex";
import RecipientsModified from "./components/RecipientsModified";

app.initializers.add('flagrow-byobu', function(app) {
    app.routes.private_discussions = {path: '/private-discussions', component: PrivateDiscussionIndex.component()};

    Discussion.prototype.recipientUsers = Model.hasMany('recipientUsers');
    Discussion.prototype.oldRecipientUsers = Model.hasMany('oldRecipientUsers');
    Discussion.prototype.recipientGroups = Model.hasMany('recipientGroups');
    Discussion.prototype.oldRecipientGroups = Model.hasMany('oldRecipientGroups');

    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');
    Discussion.prototype.canEditUserRecipients = Model.attribute('canEditUserRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');

    app.postComponents.recipientsModified = RecipientsModified;

    addRecipientComposer(app);
    addRecipientLabels();
    addRecipientsControl();
    addHasRecipientsBadge();

    addDiscussPrivatelyControl();
});
