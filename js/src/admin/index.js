import User from 'flarum/core/models/User';

import addPrivateDiscussionPermission from './addPrivateDiscussionPermission';
import addSettingsModal from "./addSettingsModal";

app.initializers.add('fof-byobu', app => {
  app.store.models.recipients = User;

  addPrivateDiscussionPermission();
  addSettingsModal();
});
