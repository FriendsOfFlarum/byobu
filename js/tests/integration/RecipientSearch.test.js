import { jest } from '@jest/globals';
import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import Stream from 'flarum/common/utils/Stream';
import ItemList from 'flarum/common/utils/ItemList';
import SearchState from 'flarum/common/states/SearchState';
import forumExtenders from '../../src/forum/extend';
import RecipientSearch from '../../src/forum/search/RecipientSearch';
import UserSearchSource from '../../src/forum/search/sources/UserSearchSource';

beforeAll(() => {
  bootstrapForum();
  app.boot();

  forumExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

beforeEach(() => {
  app.cache.byobuResults = undefined;
  app.store.find = jest.fn(() => new Promise(() => {}));
});

function setMinSearchLength(length) {
  app.forum.data.attributes.searchMinLength = length;
}

function searchesUsers(query) {
  new UserSearchSource().view(query);

  return app.store.find.mock.calls.some(([type, params]) => type === 'users' && params.filter.q === query);
}

describe('UserSearchSource', () => {
  test('searches a query as short as the configured minimum', () => {
    setMinSearchLength(2);

    expect(searchesUsers('ab')).toBe(true);
  });

  test('does not search a query shorter than the configured minimum', () => {
    setMinSearchLength(2);

    expect(searchesUsers('a')).toBe(false);
  });

  test('does not search a query shorter than a minimum above three', () => {
    setMinSearchLength(5);

    expect(searchesUsers('abcd')).toBe(false);
  });

  test.each(['at', 'map', 'constructor'])('searches %s, which names a property of the results cache', (query) => {
    setMinSearchLength(2);

    expect(searchesUsers(query)).toBe(true);
  });

  test('counts a character outside the Basic Multilingual Plane once', () => {
    setMinSearchLength(3);

    // Two code points, three UTF-16 code units.
    expect(searchesUsers('𠮷野')).toBe(false);
  });
});

describe('RecipientSearch', () => {
  function render(query) {
    app.forum.data.attributes.canStartPrivateDiscussionWithUsers = true;

    const state = new SearchState();
    state.setValue(query);

    return mq(RecipientSearch, { state, selected: Stream(new ItemList()) });
  }

  test('shows the results once the query reaches the configured minimum', () => {
    setMinSearchLength(2);

    expect(render('ab').find('.Search-results.in')).toHaveLength(1);
  });

  test('keeps the results hidden below the configured minimum', () => {
    setMinSearchLength(2);

    expect(render('a').find('.Search-results.in')).toHaveLength(0);
  });

  test('keeps the results hidden below a minimum above three', () => {
    setMinSearchLength(5);

    expect(render('abcd').find('.Search-results.in')).toHaveLength(0);
  });
});
