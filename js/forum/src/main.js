import Model from "flarum/Model";
import Discussion from "flarum/models/Discussion";
import addRecipientComposer from "flagrow/byobu/addRecipientComposer";
import addRecipientLabels from "flagrow/byobu/addRecipientLabels";
import addRecipientsControl from "flagrow/byobu/addRecipientsControl";
import addHasRecipientsBadge from "flagrow/byobu/addHasRecipientsBadge";
import PrivateDiscussionIndex from "flagrow/byobu/components/PrivateDiscussionIndex";
import RecipientsModified from "flagrow/byobu/components/RecipientsModified";

app.initializers.add('flagrow-byobu', function(app) {
    app.routes.private_discussions = {path: '/private-discussions', component: PrivateDiscussionIndex.component()};

    Discussion.prototype.recipientUsers = Model.hasMany('recipientUsers');
    Discussion.prototype.oldRecipientUsers = Model.hasMany('oldRecipientUsers');
    Discussion.prototype.recipientGroups = Model.hasMany('recipientGroups');
    Discussion.prototype.oldRecipientGroups = Model.hasMany('oldRecipientGroups');

    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');

    app.postComponents.recipientsModified = RecipientsModified;

    addRecipientComposer(app);
    addRecipientLabels();
    addRecipientsControl();
    addHasRecipientsBadge();
});
