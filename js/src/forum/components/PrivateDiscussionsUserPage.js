import UserPage from 'flarum/components/UserPage';
import DiscussionList from 'flarum/components/DiscussionList';

export default class PrivateDiscussionsUserPage extends UserPage {
    init() {
        super.init();

        this.loadUser(m.route.param('username'));
    }

    content() {
        return (
            <div className="DiscussionsUserPage">
                {DiscussionList.component({
                    params: {
                        q: `byobu:${this.user.username()} is:private`,
                        sort: 'newest'
                    }
                })}
            </div>
        );
    }
}
