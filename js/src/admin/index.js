import User from 'flarum/core/models/User';

import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';

app.initializers.add('fof-byobu', (app) => {
    app.store.models.recipients = User;

    addPrivateDiscussionPermission();
});
