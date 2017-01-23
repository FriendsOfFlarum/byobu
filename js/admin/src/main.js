import User from 'flarum/core/models/User';
import addPrivateDiscussionPermission from 'flagrow/messaging/addPrivateDiscussionPermission';

app.initializers.add('flagrow-messaging', app => {
  app.store.models.recipients = User;
  addPrivateDiscussionPermission();
});
