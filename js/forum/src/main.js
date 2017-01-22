import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

import addRecipientComposer from 'flagrow/messaging/addRecipientComposer';

app.initializers.add('flagrow-messaging', function(app) {
    Discussion.prototype.recipients = Model.hasMany('recipients');

    addRecipientComposer();
});
