import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Badge from 'flarum/components/Badge';
import Discussion from 'flarum/models/Discussion';
import User from 'flarum/models/User';
import Group from 'flarum/models/Group';
import Button from 'flarum/components/Button';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionPage from 'flarum/components/DiscussionPage';
import DiscussionHero from 'flarum/components/DiscussionHero';
import DiscussionListState from 'flarum/states/DiscussionListState';
import recipientsLabel from '../pages/labels/recipientsLabel';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import ItemList from 'flarum/utils/ItemList';
import AddRecipientModal from './../modals/AddRecipientModal';

export default (app) => {
    attributes();
    badges(app);
    index();
    hero();
    apiInclude();
    controls();
}

const add = function (discussion, items, long) {
    let recipients = [];

    if (discussion.recipientUsers().length) {
        recipients = recipients.concat(discussion.recipientUsers());
    }

    if (discussion.recipientGroups().length) {
        recipients = recipients.concat(discussion.recipientGroups());
    }

    if (recipients && recipients.length) {
        if (long) {
            items.add('recipients', recipientsLabel(recipients), 10);
        } else {
            items.add('recipients', recipientsLabel(recipients, { link: true }), 4);
        }
    }
};

function badges(app) {
    extend(Discussion.prototype, 'badges', function (badges) {
        if (this.recipientUsers().length || this.recipientGroups().length) {
            badges.add(
                'private',
                Badge.component({
                    type: 'private',
                    label: app.translator.trans('fof-byobu.forum.badges.is_private.tooltip'),
                    icon: app.forum.data.attributes['byobu.icon-badge'],
                }),
                10
            );
        }
    });
}

function index() {
    extend(DiscussionListItem.prototype, 'infoItems', function (items) {
        const discussion = this.attrs.discussion;

        add(discussion, items, true);
    });
}

function hero() {
    extend(DiscussionHero.prototype, 'items', function (items) {
        const discussion = this.attrs.discussion;

        add(discussion, items, false);
    });
}

function apiInclude() {
    extend(DiscussionPage.prototype, 'params', function (params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });
    extend(DiscussionListState.prototype, 'requestParams', function (params) {
        params.include.push('recipientUsers');
        params.include.push('recipientGroups');
    });
}

function controls() {
    extend(DiscussionControls, 'moderationControls', function (items, discussion) {
        if (discussion.canEditRecipients()) {
            items.add(
                'recipients',
                Button.component({
                    icon: app.forum.data.attributes['byobu.icon-badge'],
                    onclick: () => app.modal.show(AddRecipientModal, { discussion }),
                }, app.translator.trans('fof-byobu.forum.buttons.edit_recipients'))
            );
        }
        if (discussion && discussion.recipientUsers().find(user => user.id() === app.session.user.id())) {
            items.add(
                'remove',
                Button.component({
                    icon: 'fas fa-user-slash',
                    onclick: () => {
                        if (discussion) {
                            let recipients = new ItemList();
                            discussion.recipientUsers().map((user) => {
                                if (app.session.user.id() !== user.id()) {
                                    recipients.add('users:' + user.id(), user);
                                }
                            });

                            let recipientGroups = [];
                            let recipientUsers = [];

                            recipients.toArray().forEach((recipient) => {
                                if (recipient instanceof User) {
                                    recipientUsers.push(recipient);
                                }
                                if (recipient instanceof Group) {
                                    recipientGroups.push(recipient);
                                }
                            });

                            discussion.save({
                                relationships: {
                                    recipientUsers,
                                    recipientGroups
                                }
                            }).then(() => app.history.back());
                        }
                    },
                }, app.translator.trans('fof-byobu.forum.buttons.remove_from_discussion'))
            );
        }
    });
}

function attributes() {
    Discussion.prototype.recipientUsers = Model.hasMany('recipientUsers');
    Discussion.prototype.oldRecipientUsers = Model.hasMany('oldRecipientUsers');
    Discussion.prototype.recipientGroups = Model.hasMany('recipientGroups');
    Discussion.prototype.oldRecipientGroups = Model.hasMany('oldRecipientGroups');

    Discussion.prototype.canEditRecipients = Model.attribute('canEditRecipients');
    Discussion.prototype.canEditUserRecipients = Model.attribute('canEditUserRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');
    Discussion.prototype.canEditGroupRecipients = Model.attribute('canEditGroupRecipients');
}
