import {extend} from 'flarum/extend';
import UserControls from 'flarum/utils/UserControls';
import DiscussionComposer from "flarum/components/DiscussionComposer";
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';

export default function () {
    // Add a control allowing the discussion to be moved to another category.
    extend(UserControls, 'userControls', function (items, user) {
        if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
            items.add('private-discussion', Button.component({
                children: app.translator.trans('flagrow-byobu.forum.buttons.send_pd', {username: user.username()}),
                icon: 'map-o',
                onclick: () => {
                    const deferred = m.deferred();

                    let recipients = new ItemList([user]);
                    recipients.add('to', user);

                    DiscussionComposer.prototype.recipients = recipients;

                    const component = new DiscussionComposer({
                        user: app.session.user
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
