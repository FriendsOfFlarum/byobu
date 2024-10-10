import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import type Mithril from 'mithril';
import LogInModal from 'flarum/forum/components/LogInModal';
import PrivateDiscussionComposer from '../pages/discussions/PrivateDiscussionComposer';
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
      setTimeout(() => app.modal.show(LogInModal), 500);
      return m.route.set('/');
    }

    const params = m.route.param();
    const recipients = new ItemList<User | Group>();

    recipients.add(`users:${app.session.user.id()}`, app.session.user);

    m.route.set(app.route('byobuPrivate'));

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

      app.composer.load(PrivateDiscussionComposer, composerProps);

      app.composer.show();

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
