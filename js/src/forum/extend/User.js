import { extend } from 'flarum/extend';
import Model from "flarum/Model";
import User from "flarum/models/User";
import UserControls from 'flarum/utils/UserControls';
import PrivateDiscussionComposer from './../pages/discussions/PrivateDiscussionComposer';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

export default (app) => {
    attributes();
    message(app);
    sharedMessageHistory(app);
}

function message(app) {
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
                    icon: app.forum.data.attributes['byobu.icon-badge'],
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

function sharedMessageHistory(app) {
    extend(UserPage.prototype, 'navItems', function (items) {
        const href = app.route('byobuUserPrivate', { username: this.user.username() });

        // Hide links from guests if they are not already on the page
        if (!app.session.user && m.route.get() !== href) return;
        // Hide link for your own page.
        if (app.session.user && app.session.user.username() === this.user.username()) return;

        items.add(
            'byobu',
            LinkButton.component({
                href,
                icon: app.forum.data.attributes['byobu.icon-badge'],
            }, app.translator.trans('fof-byobu.forum.user.byobu_link')),
            85
        );
    });
}

function attributes() {
    User.prototype.blocksPd = Model.attribute('blocksPd');
    User.prototype.unifiedIndex = Model.attribute('unifiedIndex');
    User.prototype.cannotBeDirectMessaged = Model.attribute('cannotBeDirectMessaged');
    User.prototype.unreadPrivateMessagesCount = Model.attribute('unreadPrivateMessagesCount');
}
