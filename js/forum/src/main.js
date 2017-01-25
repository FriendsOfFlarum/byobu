import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

import addRecipientComposer from 'flagrow/byobu/addRecipientComposer';
import addRecipientLabels from 'flagrow/byobu/addRecipientLabels';
import addRecipientsControl from 'flagrow/byobu/addRecipientsControl';
import PrivateDiscussionIndex from 'flagrow/byobu/components/PrivateDiscussionIndex';
import RecipientsModified from 'flagrow/byobu/components/RecipientsModified';

app.initializers.add('flagrow-byobu', function(app) {
    app.routes.private_discussions = {path: '/private-discussions', component: PrivateDiscussionIndex.component()};

    Discussion.prototype.recipients = Model.hasMany('recipients');
    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');

    app.postComponents.recipientsModified = RecipientsModified;

    addRecipientComposer(app);
    addRecipientLabels();
    addRecipientsControl();
});
