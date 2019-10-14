import UserPage from 'flarum/components/UserPage';
import PrivateDiscussionList from './PrivateDiscussionList';
import Button from 'flarum/components/Button';
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
        return (
            <div className="DiscussionsUserPage">
                <Button onclick={this.newDiscussionAction.bind(this)}>New PM</Button>
                {this.list.render()}
            </div>
        );
    }
}
