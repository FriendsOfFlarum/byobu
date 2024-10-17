import app from 'flarum/admin/app';
import User from 'flarum/common/models/User';

import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';
import ByobuSettings from './components/ByobuSettingsPage';

export { default as extend } from './extend';
export * from './components';

app.initializers.add('fof-byobu', () => {
  app.store.models.recipients = User;

  app.extensionData.for('fof-byobu').registerPage(ByobuSettings);

  addPrivateDiscussionPermission();
});
