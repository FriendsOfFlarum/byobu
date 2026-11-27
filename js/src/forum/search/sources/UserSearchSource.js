import app from 'flarum/forum/app';
import SearchManager from 'flarum/common/SearchManager';
import highlight from 'flarum/common/helpers/highlight';
import Avatar from 'flarum/common/components/Avatar';
import username from 'flarum/common/helpers/username';

export default class UserSearchSource {
  view(query) {
    if (SearchManager.queryLength(query) < SearchManager.minSearchLength() || this.loading) return;

    if (!app.cache.byobuResults) {
      app.cache.byobuResults = new Map();
    }

    this.query = query;

    if (!app.cache.byobuResults.has(this.query)) {
      this.loading = true;

      app.cache.byobuResults.set(this.query, []);
      app.store
        .find('users', {
          filter: { q: this.query, 'allows-pd': true },
          page: { limit: 5 },
        })
        .then(this.pushResults.bind(this));
    } else
      return [
        <li className="Dropdown-header">{app.translator.trans('core.lib.search_source.users.heading')}</li>,
        app.cache.byobuResults.get(this.query).map((user) => {
          const name = username(user, (name) => highlight(name, query));

          return (
            <li className="SearchResult" data-index={'users:' + user.id()}>
              <a data-index={'users:' + user.id()}>
                <Avatar user={user} />
                {name}
              </a>
            </li>
          );
        }),
      ];
  }

  pushResults(results) {
    results.payload.data.map((result) => {
      var user = app.store.getById('users', result.id);
      app.cache.byobuResults.get(this.query).push(user);
    });
    this.loading = false;
    m.redraw();
  }
}
