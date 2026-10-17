import { jest } from '@jest/globals';
import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import forumExtenders from '../../src/forum/extend';
import AddRecipientModal from '../../src/forum/modals/AddRecipientModal';

beforeAll(() => {
  bootstrapForum();
  app.boot();

  forumExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

/**
 * A private discussion between alice and bob, also addressed to Staff.
 */
function privateDiscussion() {
  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { title: 'Secret', isPrivateDiscussion: true, canEditRecipients: true },
      relationships: {
        recipientUsers: {
          data: [
            { type: 'users', id: '3' },
            { type: 'users', id: '4' },
          ],
        },
        recipientGroups: { data: [{ type: 'groups', id: '10' }] },
      },
    },
    included: [
      { type: 'users', id: '3', attributes: { username: 'alice' } },
      { type: 'users', id: '4', attributes: { username: 'bob' } },
      { type: 'groups', id: '10', attributes: { nameSingular: 'Staff', namePlural: 'Staff' } },
    ],
  });

  const discussion = app.store.getById('discussions', '1');
  discussion.save = jest.fn(() => Promise.resolve(discussion));

  return discussion;
}

function editRecipients(discussion, change = () => {}) {
  const modal = new AddRecipientModal();
  modal.oninit({ attrs: { discussion, state: { close: jest.fn() } } });

  change(modal.selected());
  modal.onsubmit({ preventDefault() {} });

  expect(discussion.save).toHaveBeenCalledTimes(1);

  const { recipientUsers, recipientGroups } = discussion.save.mock.calls[0][0].relationships;

  return {
    users: recipientUsers.map((user) => user.id()),
    groups: recipientGroups.map((group) => group.id()),
  };
}

test('saving without changes keeps every recipient', () => {
  expect(editRecipients(privateDiscussion())).toStrictEqual({ users: ['3', '4'], groups: ['10'] });
});

test('removing a user keeps the other recipients', () => {
  expect(editRecipients(privateDiscussion(), (selected) => selected.remove('users:4'))).toStrictEqual({ users: ['3'], groups: ['10'] });
});

test('removing a group keeps the users', () => {
  expect(editRecipients(privateDiscussion(), (selected) => selected.remove('groups:10'))).toStrictEqual({ users: ['3', '4'], groups: [] });
});
