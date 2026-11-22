import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';
import commonExtenders from '../../src/common/extend';

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

describe('translated keywords', () => {
  test('jest:prywatna keeps only private discussions', () => {
    expect(app.search.gambits.apply('discussions', { q: 'jest:prywatna' })).toStrictEqual({ q: '', private: true });
  });

  test('pozwala-na-pd:tak keeps users who accept private discussions', () => {
    expect(app.search.gambits.apply('users', { q: 'pozwala-na-pd:tak' })).toStrictEqual({ q: '', 'allows-pd': 'tak' });
  });
});

// English keywords work in every locale on Flarum versions with gambit
// localization aliases (canonicalKey).
const withAliases = typeof BooleanGambit.prototype.canonicalPattern === 'function' ? describe : describe.skip;

withAliases('English keywords in a translated locale', () => {
  test('is:private still works', () => {
    expect(app.search.gambits.apply('discussions', { q: 'byobu:alice is:private' })).toStrictEqual({ q: '', byobu: 'alice', private: true });
  });

  test('allows-pd:yes still works', () => {
    expect(app.search.gambits.apply('users', { q: 'allows-pd:yes' })).toStrictEqual({ q: '', 'allows-pd': 'yes' });
  });
});
