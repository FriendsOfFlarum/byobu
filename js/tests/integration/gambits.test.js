import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import commonExtenders from '../../src/common/extend';

beforeAll(() => {
  bootstrapForum();
  app.boot();

  // The English search keywords, as in resources/locale/en.yml.
  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'is',
    'fof-byobu.lib.gambits.byobu.key': 'byobu',
    'fof-byobu.lib.gambits.byobu.hint': 'username or display name of a recipient',
    'fof-byobu.lib.gambits.private.key': 'private',
    'fof-byobu.lib.gambits.allows-pd.key': 'allows-pd',
    'fof-byobu.lib.gambits.allows-pd.hint': 'yes',
  });

  commonExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

// The filter keys must match the backend filters: ByobuFilter, PrivacyFilter
// and AllowsPdFilter.
describe('discussion search', () => {
  test('byobu:<user> filters by recipient', () => {
    expect(app.search.gambits.apply('discussions', { q: 'hello byobu:alice' })).toStrictEqual({ q: 'hello', byobu: 'alice' });
  });

  test('is:private keeps only private discussions', () => {
    expect(app.search.gambits.apply('discussions', { q: 'is:private' })).toStrictEqual({ q: '', private: true });
  });

  test('-is:private leaves them out', () => {
    expect(app.search.gambits.apply('discussions', { q: '-is:private' })).toStrictEqual({ q: '', '-private': true });
  });

  test('filters turn back into the search query', () => {
    expect(app.search.gambits.from('discussions', '', { byobu: 'alice' }).trim()).toBe('byobu:alice');
    expect(app.search.gambits.from('discussions', '', { private: true }).trim()).toBe('is:private');
  });
});

describe('user search', () => {
  test('allows-pd:yes keeps users who accept private discussions', () => {
    expect(app.search.gambits.apply('users', { q: 'allows-pd:yes' })).toStrictEqual({ q: '', 'allows-pd': 'yes' });
  });
});
