import User from 'flarum/core/models/User';
import addPrivateDiscussionPermission from 'flagrow/byobu/addPrivateDiscussionPermission';

app.initializers.add('flagrow-byobu', app => {
  app.store.models.recipients = User;
  addPrivateDiscussionPermission();
});
