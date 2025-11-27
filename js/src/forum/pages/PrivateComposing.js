import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';

export default class PrivateComposing {
  constructor(recipient) {
    this.recipient = recipient;
  }

  action(e) {
    e.preventDefault();

    return new Promise(async (resolve, reject) => {
      if (app.session.user) {
        let recipients = new ItemList();

        recipients.add('users:' + app.session.user.id(), app.session.user);

        if (this.recipient && app.session.user.id() !== this.recipient.id()) {
          recipients.add('users:' + this.recipient.id(), this.recipient);
        }

        await app.composer.load(
          () =>
            import('flarum/forum/components/DiscussionComposer').then(async () => {
              return await import('./discussions/PrivateDiscussionComposer');
            }),
          {
            user: app.session.user,
            recipients: recipients,
            recipientUsers: recipients,
          }
        );

        app.composer.show();

        return resolve();
      } else {
        await app.modal.show(() => import('flarum/forum/components/LogInModal'));

        return reject();
      }
    });
  }

  component() {
    return Button.component(
      {
        icon: 'fas fa-pen',
        className: 'Button Button--primary IndexPage-newDiscussion',
        itemClassName: 'App-primaryControl fof-byobu_primaryControl',
        onclick: this.action.bind(this),
        disabled: !this.canStartDiscussion,
      },
      app.translator.trans(this.canStartDiscussion ? 'fof-byobu.forum.nav.start_button' : 'core.forum.index.cannot_start_discussion_button')
    );
  }

  get canStartDiscussion() {
    return app.session.user && app.forum.attribute('canStartPrivateDiscussion');
  }
}
