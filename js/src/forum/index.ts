import app from 'flarum/forum/app';
import extenders from './extenders';
import pages from './pages';
import notifications from './notifications';

export * from './modals';
export * from './pages/discussions';

export { default as extend } from './extend';

app.initializers.add('fof-byobu', function () {
  extenders();

  pages();
  notifications();
});
