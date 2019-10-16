import UserPage from 'flarum/components/UserPage';
import PrivateDiscussionList from './PrivateDiscussionList';

export default class PrivateDiscussionsUserPage extends UserPage {
    init() {
        super.init();

        this.loadUser(m.route.param('username'));

        this.list = new PrivateDiscussionList({
            params: {
                q: `byobu:${this.user.username()} is:private`,
                sort: 'newest'
            }
        });

        this.list.refresh();
    }

    content() {
        return (
            <div className="DiscussionsUserPage">
                {this.list.render()}
            </div>
        );
    }
}
