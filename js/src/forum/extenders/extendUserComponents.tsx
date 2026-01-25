import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserControls from 'flarum/forum/utils/UserControls';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';
import UserPage from 'flarum/forum/components/UserPage';
import LinkButton from 'flarum/common/components/LinkButton';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import canStartPrivateDiscussion from '../helpers/canStartPrivateDiscussion';

export default function extendUserComponents() {
  // @ts-ignore - userControls is not typed properly at the moment
  extend(UserControls, 'userControls', function (items: ItemList<Mithril.Children>, user: User, context: any) {
    if (canStartPrivateDiscussion(user)) {
      items.add(
        'private-discussion',
        <Button
          icon={app.forum.attribute('byobu.icon-badge')}
          onclick={async (e: Event) => {
            e.preventDefault();

            const recipients = new ItemList<User>();
            recipients.add('users:' + app.session.user!.id(), app.session.user!);
            recipients.add('users:' + user.id(), user);

            await app.composer.load(
              () =>
                import('flarum/forum/components/DiscussionComposer').then(async () => {
                  return await import('../pages/discussions/PrivateDiscussionComposer');
                }),
              {
                user: app.session.user,
                recipients: recipients,
                recipientUsers: recipients,
                titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
                submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button'),
              }
            );

            app.composer.show();
          }}
        >
          {app.translator.trans('fof-byobu.forum.buttons.send_pd', { username: user.displayName() })}
        </Button>
      );
    }
  });

  extend(UserPage.prototype, 'navItems', function (items: ItemList<Mithril.Children>) {
    if (!this.user) return;
    const href = app.route('byobuUserPrivate', { username: this.user.slug() });

    // Hide links from guests if they are not already on the page
    if (!app.session.user && m.route.get() !== href) return;
    // Hide link for your own page.
    if (app.session.user === this.user) return;

    items.add(
      'byobu',
      <LinkButton href={href} icon={app.forum.attribute('byobu.icon-badge')}>
        {app.translator.trans('fof-byobu.forum.user.byobu_link')}
      </LinkButton>,
      85
    );
  });
}
