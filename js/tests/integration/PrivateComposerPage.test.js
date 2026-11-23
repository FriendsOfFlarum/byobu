import { jest } from '@jest/globals';
import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import ComposerState from 'flarum/forum/states/ComposerState';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import patchMithril from '@flarum/core/src/common/utils/patchMithril';
import forumExtenders from '../../src/forum/extend';
import PrivateComposerPage from '../../src/forum/components/PrivateComposerPage';

beforeAll(() => {
  // The test environment's Mithril lacks the patch that makes inputs' `bidi` attr work in the app.
  patchMithril(window);
  globalThis.m = window.m;

  bootstrapForum();
  app.boot();

  forumExtenders.forEach((extender) => extender.extend(app, { name: 'fof-byobu', exports: {} }));
});

// jQuery's animation loop requests the next frame before each tick, so the
// test environment's synchronous requestAnimationFrame recurses without end.
const syncAnimationFrame = window.requestAnimationFrame;

beforeAll(() => {
  window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
});

afterAll(() => {
  window.requestAnimationFrame = syncAnimationFrame;
});

beforeEach(() => {
  const previous = document.getElementById('composer');

  if (previous) {
    m.mount(previous, null);
    previous.remove();
  }

  document.body.insertAdjacentHTML('beforeend', '<div id="composer"></div>');
  app.composer = new ComposerState();

  jest.spyOn(m.route, 'set').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

function nextShow() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('The composer was not shown.')), 2000);

    jest.spyOn(app.composer, 'show').mockImplementation(function () {
      const shown = ComposerState.prototype.show.call(this);

      shown.then(() => {
        clearTimeout(timeout);
        resolve();
      });

      return shown;
    });
  });
}

function openComposerRoute(params) {
  jest.spyOn(m.route, 'param').mockImplementation((key) => (key === undefined ? params : params[key]));

  const shown = nextShow();
  new PrivateComposerPage().configComposer();

  return shown;
}

async function openDraft() {
  await app.composer.load(DiscussionComposer, { user: app.session.user });
  await app.composer.show();
  app.composer.fields.title('Mine');
  app.composer.fields.content('My draft');
}

test('fills in the title when the composer has not been opened yet', async () => {
  await openComposerRoute({ title: 'Hello', content: 'World' });

  expect(app.composer.fields.title()).toBe('Hello');
  expect(app.composer.fields.content()).toBe('World');
  expect(document.querySelector('#composer .DiscussionComposer-title').value).toBe('Hello');
});

test('fills in a title the route parses as a boolean as text', async () => {
  await openComposerRoute({ title: false });

  expect(app.composer.fields.title()).toBe('false');
});

test('keeps the title out of a public composer opened while the first one mounts', async () => {
  jest.spyOn(m.route, 'param').mockImplementation((key) => (key === undefined ? { title: 'Hello' } : undefined));

  const replaced = new Promise((resolve) => {
    jest.spyOn(app.composer, 'show').mockImplementationOnce(async function () {
      await this.load(DiscussionComposer, { user: app.session.user });
      await ComposerState.prototype.show.call(this);
      resolve();
    });
  });

  new PrivateComposerPage().configComposer();
  await replaced;

  expect(app.composer.body.componentClass).toBe(DiscussionComposer);
  expect(app.composer.fields.title()).toBe('');
});

test('renders the composer with the title already filled in', async () => {
  const titles = [];
  const oncreate = DiscussionComposer.prototype.oncreate;

  jest.spyOn(DiscussionComposer.prototype, 'oncreate').mockImplementation(function (vnode) {
    titles.push(vnode.dom.querySelector('.DiscussionComposer-title').value);
    oncreate.call(this, vnode);
  });

  await openComposerRoute({ title: 'Hello', content: 'World' });

  expect(titles).toStrictEqual(['Hello']);
});

test('replaces a draft the user agrees to discard', async () => {
  await openDraft();
  jest.spyOn(window, 'confirm').mockReturnValue(true);

  await openComposerRoute({ title: 'Hello', content: 'World' });

  expect(window.confirm).toHaveBeenCalled();
  expect(app.composer.fields.title()).toBe('Hello');
  expect(app.composer.fields.content()).toBe('World');
});

test('leaves a draft alone when the user chooses to keep it', async () => {
  await openDraft();
  jest.spyOn(window, 'confirm').mockReturnValue(false);

  await openComposerRoute({ title: 'Hello', content: 'World' });

  expect(window.confirm).toHaveBeenCalled();
  expect(app.composer.fields.title()).toBe('Mine');
  expect(app.composer.fields.content()).toBe('My draft');
});

test('brings back a minimized draft the user chooses to keep', async () => {
  await openDraft();
  app.composer.minimize();
  jest.spyOn(window, 'confirm').mockReturnValue(false);

  await openComposerRoute({ title: 'Hello', content: 'World' });

  expect(app.composer.position).toBe(ComposerState.Position.NORMAL);
  expect(app.composer.fields.title()).toBe('Mine');
});
