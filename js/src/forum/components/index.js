import PrivateDiscussionComposer from './PrivateDiscussionComposer';
import AddRecipientModal from './AddRecipientModal';
import PrivateDiscussionAddedNotification from './notifications/PrivateDiscussionAddedNotification';
import PrivateDiscussionList from './PrivateDiscussionList';
import PrivateDiscussionNotification from './notifications/PrivateDiscussionNotification';
import PrivateDiscussionReplyNotification from './notifications/PrivateDiscussionReplyNotification';
import PrivateDiscussionsUserPage from './PrivateDiscussionsUserPage';
import PrivateDiscussionUserLeftNotification from './notifications/PrivateDiscussionUserLeftNotification';
import RecipientLeft from './RecipientLeft';
import RecipientSearch from './RecipientSearch';
import RecipientsModified from './RecipientsModified';
import GroupSearchSource from './sources/GroupSearchSource';
import UserSearchSource from './sources/GroupSearchSource';

export const components = {
    AddRecipientModal: AddRecipientModal,
    PrivateDiscussionAddedNotification: PrivateDiscussionAddedNotification,
    PrivateDiscussionComposer: PrivateDiscussionComposer,
    PrivateDiscussionList: PrivateDiscussionList,
    PrivateDiscussionNotification: PrivateDiscussionNotification,
    PrivateDiscussionReplyNotification: PrivateDiscussionReplyNotification,
    PrivateDiscussionUserPage: PrivateDiscussionsUserPage,
    PrivateDiscussionUserLeftNotification: PrivateDiscussionUserLeftNotification,
    RecipientLeft: RecipientLeft,
    RecipientSearch: RecipientSearch,
    RecipientsModified: RecipientsModified,
    sources: {
        GroupSearchSource: GroupSearchSource,
        UserSearchSource: UserSearchSource,
    },
};
