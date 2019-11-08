import UserPage from 'flarum/components/UserPage';
import PrivateDiscussionList from './PrivateDiscussionList';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import LogInModal from 'flarum/components/LogInModal';
import PrivateDiscussionComposer from './PrivateDiscussionComposer';

export default class PrivateDiscussionsUserPage extends UserPage {
    init() {
        super.init();

        this.changeSort('latest');
    }

    show(user) {
        // We can not create the list in init because the user will not be available if it has to be loaded asynchronously
        this.list = new PrivateDiscussionList({
            params: {
                q: `byobu:${user.username()} is:private`,
                sort: this.sort
            }
        });

        this.list.refresh();

        // We call the parent method after creating the list, this way the this.list propert
        // is set before content() is called for the first time
        super.show(user);
    }

    newDiscussionAction(e) {
        e.preventDefault();

        const deferred = m.deferred();

        if (app.session.user) {
            const component = new PrivateDiscussionComposer({ user: app.session.user });

            app.composer.load(component);

            deferred.resolve(component);
        } else {
            deferred.reject();

            app.modal.show(new LogInModal());
        }

        return deferred.promise;
    }

    handleChangeSort(sort, e) {
        e.preventDefault();

        this.changeSort(sort);
    }

    changeSort(sort) {
        this.sort = sort;
        this.loadUser(m.route.param('username'));
    }

    content() {
        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

        const sortMap = this.list.sortMap();
        const sortOptions = {};
        for (const i in sortMap) {
          sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
        }

        return (
            <div className="DiscussionsUserPage">
                    <ul className="DiscussionsUserPage-toolbar-action">
                        <li>
                            {Button.component({
                                children: app.translator.trans(canStartDiscussion ? 'fof-byobu.forum.nav.start_button' : 'core.forum.index.cannot_start_discussion_button'),
                                // icon: 'fas fa-edit',
                                className: 'Button Button--primary IndexPage-newDiscussion',
                                itemClassName: 'App-primaryControl',
                                onclick: this.newDiscussionAction.bind(this),
                                disabled: !canStartDiscussion,
                                style: { marginBottom: '24px' }
                            })}
                        </li>
                    </ul>
                    <ul className="DiscussionsUserPage-toolbar-view">
                        <li>
                            {Dropdown.component({
                                buttonClassName: 'Button',
                                label: sortOptions[this.sort] || Object.keys(sortMap).map(key => sortOptions[key])[0],
                                children: Object.keys(sortOptions).map(value => {
                                    const label = sortOptions[value];
                                    const active = (this.sort || Object.keys(sortMap)[0]) === value;

                                    return Button.component({
                                        children: label,
                                        icon: active ? 'fas fa-check' : true,
                                        onclick: this.handleChangeSort.bind(this, value),
                                        active: active,
                                    })
                                }),
                            })}
                        </li>
                    </ul>
                {this.list.render()}
            </div>
        );
    }
}
