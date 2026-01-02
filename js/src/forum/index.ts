import app from 'flarum/forum/app';
import extenders from './extenders';
import pages from './pages';
import extendNotificationGrid from './notifications/extendNotificationGrid';

export { default as extend } from './extend';

app.initializers.add('fof-byobu', function () {
  extenders();

  pages();
  extendNotificationGrid();
});
