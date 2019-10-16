import UserPage from 'flarum/components/UserPage';
import PrivateDiscussionList from './PrivateDiscussionList';
import Button from 'flarum/components/Button';
import LogInModal from 'flarum/components/LogInModal';
import PrivateDiscussionComposer from './PrivateDiscussionComposer';

export default class PrivateDiscussionsUserPage extends UserPage {
    init() {
        super.init();

        this.loadUser(m.route.param('username'));
    }

    show(user) {
        // We can not create the list in init because the user will not be available if it has to be loaded asynchronously
        this.list = new PrivateDiscussionList({
            params: {
                q: `byobu:${user.username()} is:private`,
                sort: 'newest'
            }
        });

        this.list.refresh();

        // We call the parent method after creating the list, this way the this.list property
        // is set before content() is called for the first time
        super.show(user);
    }

    newDiscussionAction(e) {
        e.preventDefault();

        const deferred = m.deferred();

        if (app.session.user) {
            const component = new PrivateDiscussionComposer({ user: app.session.user });

            app.composer.load(component);
            app.composer.show();

            deferred.resolve(component);
        } else {
            deferred.reject();

            app.modal.show(new LogInModal());
        }

        return deferred.promise;
    }

    content() {
        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

        return (
            <div className="DiscussionsUserPage">
                {Button.component({
                    children: app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'),
                    // icon: 'fas fa-edit',
                    className: 'Button Button--primary IndexPage-newDiscussion',
                    itemClassName: 'App-primaryControl',
                    onclick: this.newDiscussionAction.bind(this),
                    disabled: !canStartDiscussion,
                    style: {marginBottom: '24px'}
                })}
                {this.list.render()}
            </div>
        );
    }
}
