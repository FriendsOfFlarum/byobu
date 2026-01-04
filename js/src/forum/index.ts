import app from 'flarum/forum/app';
import pages from './pages';
import extendNotificationGrid from './extenders/extendNotificationGrid';
import extendUserComponents from './extenders/extendUserComponents';
import extendSettingsPage from './extenders/extendSettingsPage';
import Discussion from './extenders/Discussion';

export { default as extend } from './extend';

app.initializers.add('fof-byobu', function () {
  Discussion();

  pages();
  extendNotificationGrid();

  extendUserComponents();
  extendSettingsPage();
});
