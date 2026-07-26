import Extend from 'flarum/common/extenders';
import Discussion from 'flarum/common/models/Discussion';
import Group from 'flarum/common/models/Group';
import User from 'flarum/common/models/User';
import IndexPage from 'flarum/forum/components/IndexPage';
import MadePublic from './events/MadePublic';
import RecipientLeft from './events/RecipientLeft';
import RecipientsModified from './events/RecipientsModified';
import commonExtend from '../common/extend';
import PrivateDiscussionNotification from './notifications/PrivateDiscussionNotification';
import PrivateDiscussionReplyNotification from './notifications/PrivateDiscussionReplyNotification';
import PrivateDiscussionUserLeftNotification from './notifications/PrivateDiscussionUserLeftNotification';
import PrivateDiscussionAddedNotification from './notifications/PrivateDiscussionAddedNotification';
import PrivateDiscussionMadePublicNotification from './notifications/PrivateDiscussionMadePublicNotification';

export default [
  ...commonExtend,
  new Extend.PostTypes() //
    .add('recipientsModified', RecipientsModified)
    .add('recipientLeft', RecipientLeft)
    .add('madePublic', MadePublic),

  new Extend.Routes() //
    .add('byobuUserPrivate', '/u/:username/private', () => import('./pages/PrivateDiscussionsUserPage'))
    .add('byobuPrivate', '/private', IndexPage)
    .add('byobuComposer', '/private/composer', () => import('./components/PrivateComposerPage')),

  new Extend.Model(Discussion)
    .hasMany<User>('recipientUsers')
    .hasMany<User>('oldRecipientUsers')
    .hasMany<Group>('recipientGroups')
    .hasMany<Group>('oldRecipientGroups')
    .attribute<boolean>('canEditRecipients')
    .attribute<boolean>('canEditUserRecipients')
    .attribute<boolean>('canEditGroupRecipients')
    .attribute<boolean>('canMakePublic')
    .attribute<boolean>('isPrivateDiscussion'),

  new Extend.Model(User) //
    .attribute<boolean>('blocksPd')
    .attribute<number>('unreadPrivateMessagesCount'),

  new Extend.Notification() //
    .add('byobuPrivateDiscussionCreated', PrivateDiscussionNotification)
    .add('byobuPrivateDiscussionReplied', PrivateDiscussionReplyNotification)
    .add('byobuRecipientRemoved', PrivateDiscussionUserLeftNotification)
    .add('byobuPrivateDiscussionAdded', PrivateDiscussionAddedNotification)
    .add('byobuPrivateDiscussionMadePubic', PrivateDiscussionMadePublicNotification),
];
