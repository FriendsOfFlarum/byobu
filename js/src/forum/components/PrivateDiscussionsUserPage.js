import UserPage from 'flarum/components/UserPage';
import PrivateDiscussionList from './PrivateDiscussionList';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import PrivateDiscussionComposer from './PrivateDiscussionComposer';
import LogInModal from 'flarum/components/LogInModal';

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
                sort: this.sort,
            }
        });

        this.list.refresh();

        // We call the parent method after creating the list, this way the this.list property
        // is set before content() is called for the first time
        super.show(user);
    }

    handleChangeSort(sort, e) {
        e.preventDefault();

        this.changeSort(sort);
    }

    changeSort(sort) {
        this.sort = sort;
        this.loadUser(m.route.param('username'));
    }

    newDiscussionAction(e) {
        e.preventDefault();

        const deferred = m.deferred();

        if (app.session.user) {
            let recipients = new ItemList();
            recipients.add('users:' + app.session.user.id(), app.session.user);

            if (this.user !== null && app.session.user.id() !== this.user.id()) {
                recipients.add('users:' + this.user.id(), this.user);
            }

            PrivateDiscussionComposer.prototype.recipients = recipients;

            const component = new PrivateDiscussionComposer({
                user: app.session.user,
                recipients: recipients,
                recipientUsers: recipients,
                titlePlaceholder: app.translator.trans('fof-byobu.forum.composer_private_discussion.title_placeholder'),
                submitLabel: app.translator.trans('fof-byobu.forum.composer_private_discussion.submit_button')
            });

            app.composer.load(component);

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
                <div className="DiscussionsUserPage-toolbar">
                    <ul className="DiscussionsUserPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
                    <ul className="DiscussionsUserPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                </div>
                {this.list.render()}
            </div>
        );
    }

    actionItems() {
        const items = new ItemList();
        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

        if (app.session.user && app.forum.attribute('canStartPrivateDiscussion')) {
            items.add('start_private',
            Button.component({
                children: app.translator.trans(canStartDiscussion ? 'fof-byobu.forum.nav.start_button' : 'core.forum.index.cannot_start_discussion_button'),
                className: 'Button Button--primary IndexPage-newDiscussion',
                itemClassName: 'App-primaryControl',
                onclick: this.newDiscussionAction.bind(this),
                disabled: !canStartDiscussion
            }));
        }

        return items;
    }

    viewItems() {
        const items = new ItemList();
        const sortMap = this.list.sortMap();

        const sortOptions = {};
        for (const i in sortMap) {
            sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
        }

        items.add('sort',
            Dropdown.component({
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
            })
        );

        return items;
    }
}
