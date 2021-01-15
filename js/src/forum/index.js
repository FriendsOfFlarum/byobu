import events from './events';
import extend from './extend';
import pages from './pages';
import notifications from './notifications';

export * from './modals';
export * from './pages/discussions';

app.initializers.add('fof-byobu', function (app) {
    events(app);
    extend(app);

    pages(app);
    notifications(app);
});
