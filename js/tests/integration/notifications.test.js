import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import forumExtenders from '../../src/forum/extend';

beforeAll(() => {
  bootstrapForum();
  app.boot();

  forumExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

// The types the backend's notification blueprints send (their getType()). A
// notification whose type has no component renders as nothing.
test.each([
  'byobuPrivateDiscussionCreated',
  'byobuPrivateDiscussionReplied',
  'byobuRecipientRemoved',
  'byobuPrivateDiscussionAdded',
  'byobuMadePublic',
])('%s notifications have a component to show them', (type) => {
  expect(app.notificationComponents[type]).toBeDefined();
});
