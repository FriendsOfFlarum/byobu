import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

import addRecipientComposer from 'flagrow/byobu/addRecipientComposer';
import addRecipientLabels from 'flagrow/byobu/addRecipientLabels';
import PrivateDiscussionIndex from 'flagrow/byobu/components/PrivateDiscussionIndex';

app.initializers.add('flagrow-byobu', function(app) {
    app.routes.private_discussions = {path: '/private-discussions', component: PrivateDiscussionIndex.component()};

    Discussion.prototype.recipients = Model.hasMany('recipients');

    addRecipientComposer();
    addRecipientLabels();
});
