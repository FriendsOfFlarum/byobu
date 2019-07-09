import {extend} from 'flarum/extend';
import UserControls from 'flarum/utils/UserControls';
import DiscussionComposer from "flarum/components/DiscussionComposer";
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';

export default function () {
    // Add a control allowing the discussion to be moved to another category.
    extend(UserControls, 'userControls', function (items, user) {
        if (app.session.user &&
            app.session.user.id() !== user.id() &&
            app.forum.attribute('canStartPrivateDiscussion') &&
            ((user.blocksPd() === false || app.forum.attribute('canStartPrivateDiscussionWithBlockers')) && !user.cannotBeDirectMessaged())
        ) {
            items.add('private-discussion', Button.component({
                children: app.translator.trans('fof-byobu.forum.buttons.send_pd', {username: user.username()}),
                icon: 'far fa-map',
                onclick: () => {
                    const deferred = m.deferred();

                    let recipients = new ItemList();
                    recipients.add('users:' + user.id(), user);
                    recipients.add('users:' + app.session.user.id(), app.session.user);

                    DiscussionComposer.prototype.recipients = recipients;

                    const component = new DiscussionComposer({
                        user: app.session.user,
                        recipients: recipients,
                        recipientUsers: recipients
                    });

                    app.composer.load(component);
                    app.composer.show();

                    deferred.resolve(component);

                    return deferred.promise;
                }
            }));
        }

        return items;
    });
}
