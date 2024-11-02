import app from 'flarum/admin/app';
import User from 'flarum/common/models/User';

import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';
import ByobuSettingsPage from './components/ByobuSettingsPage';

export { default as extend } from './extend';
export * from './components';

app.initializers.add('fof-byobu', () => {
  app.store.models.recipients = User;

  app.registry.for('fof-byobu').registerPage(ByobuSettingsPage);

  addPrivateDiscussionPermission();
});
