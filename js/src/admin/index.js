import User from 'flarum/core/models/User';

import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';
import ByobuSettings from './components/ByobuSettingsPage';

app.initializers.add('fof-byobu', (app) => {
    app.store.models.recipients = User;

    app.extensionData.for('fof-byobu').registerPage(ByobuSettings);

    addPrivateDiscussionPermission(app);
});
