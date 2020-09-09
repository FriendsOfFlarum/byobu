import { extend } from 'flarum/extend';
import UserControls from 'flarum/utils/UserControls';
import PrivateDiscussionComposer from './components/PrivateDiscussionComposer';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';

export default function () {
    // Add a control allowing the discussion to be moved to another category.
    extend(UserControls, 'userControls', function (items, user) {
        if (
            app.session.user &&
            app.session.user.id() !== user.id() &&
            app.forum.attribute('canStartPrivateDiscussion') &&
            (user.blocksPd() === false || (app.forum.attribute('canStartPrivateDiscussionWithBlockers') && user.cannotBeDirectMessaged()))
        ) {
            items.add(
                'private-discussion',
                Button.component({
                    icon: 'far fa-map',
                    onclick: (e) => {
                        e.preventDefault();

                        return new Promise((resolve) => {
                            let recipients = new ItemList();
                            recipients.add('users:' + app.session.user.id(), app.session.user);
                            recipients.add('users:' + user.id(), user);

                            PrivateDiscussionComposer.prototype.recipients = recipients;

                            app.composer.load(PrivateDiscussionComposer, {
                                user: app.session.user,
                                recipients: recipients,
                                recipientUsers: recipients,
                                titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
                                submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button'),
                            });
                            app.composer.show();

                            return resolve(app.composer);
                        })
                    },
                }, app.translator.trans('fof-byobu.forum.buttons.send_pd', { username: user.username() }))
            );
        }

        return items;
    });
}
