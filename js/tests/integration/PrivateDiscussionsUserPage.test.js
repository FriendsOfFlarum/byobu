import { jest } from '@jest/globals';
import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import commonExtenders from '../../src/common/extend';
import PrivateDiscussionsUserPage from '../../src/forum/pages/PrivateDiscussionsUserPage';

beforeAll(() => {
  bootstrapForum();
  app.boot();

  // Search keywords as translated by a language pack (Polish here).
  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'jest',
    'fof-byobu.lib.gambits.byobu.key': 'byobu',
    'fof-byobu.lib.gambits.byobu.hint': 'nazwa użytkownika lub wyświetlana nazwa uczestnika',
    'fof-byobu.lib.gambits.private.key': 'prywatna',
    'fof-byobu.lib.gambits.allows-pd.key': 'pozwala-na-pd',
    'fof-byobu.lib.gambits.allows-pd.hint': 'tak',
  });

  commonExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("the profile tab requests the user's private discussions in a translated locale", () => {
  jest.spyOn(UserPage.prototype, 'show').mockImplementation(() => {});
  const request = jest.spyOn(app, 'request').mockImplementation(() => new Promise(() => {}));

  app.store.pushPayload({ data: { type: 'users', id: '3', attributes: { username: 'alice', slug: 'alice' } } });

  const page = Object.create(PrivateDiscussionsUserPage.prototype);
  page.sort = 'latest';
  page.show(app.store.getById('users', '3'));

  expect(request).toHaveBeenCalledTimes(1);

  const { url, params } = request.mock.calls[0][0];

  expect(url).toMatch(/\/discussions$/);
  expect(params.filter).toStrictEqual({ byobu: 'alice', private: true });
  expect(params.sort).toBe('-lastPostedAt');
});
