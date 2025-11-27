import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import type Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import Group from 'flarum/common/models/Group';
import User from 'flarum/common/models/User';

export default class PrivateComposerPage extends Page {
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.configComposer();
  }

  configComposer() {
    if (!app.session.user) {
      setTimeout(() => app.modal.show(() => import('flarum/forum/components/LogInModal')), 500);
      return m.route.set('/');
    }

    const params = m.route.param();
    const recipients = new ItemList<User | Group>();

    recipients.add(`users:${app.session.user.id()}`, app.session.user);

    const redirect = params.redirect;
    const target = redirect ? (redirect.startsWith('/') ? redirect : app.route(redirect)) : app.route('byobuPrivate');

    m.route.set(target);

    setTimeout(() => {
      const composerProps = {
        user: app.session.user,
        recipients: recipients,
        originalContent: null,
      };

      if (params.content) {
        composerProps.originalContent = params.content;
      }

      if (params.recipientUsers) {
        params.recipientUsers.split(',').forEach((u: string) => {
          const su = app.store.getById<User>('users', u);
          if (!su) return;
          recipients.add(`users:${u}`, su);
        });
      }

      if (params.recipientGroups) {
        params.recipientGroups.split(',').forEach((g: string) => {
          const sg = app.store.getById<Group>('groups', g);
          if (!sg) return;
          recipients.add(`groups:${g}`, sg);
        });
      }

      // @TODO: Modify this to use lazy loading, checkout https://docs.flarum.org/2.x/extend/code-splitting#async-composers
      app.composer
        .load(() => import('../pages/discussions/PrivateDiscussionComposer'), composerProps)
        .then((PrivateDiscussionComposer) => {
          // @TODO: Move all direct access to the module object here. Including subsequent calls to app.composer.show(), checkout https://docs.flarum.org/2.x/extend/code-splitting#async-composers
          app.composer.show();
        });

      if (params.title) {
        // @ts-expect-error
        app.composer.fields?.title(params.title);
      }
    }, 0);
  }

  view() {
    return <div />;
  }
}
