import PrivateDiscussionComposer from "./components/PrivateDiscussionComposer";
import AddRecipientModal from "./components/AddRecipientModal";
import PrivateDiscussionAddedNotification from "./components/PrivateDiscussionAddedNotification";
import PrivateDiscussionIndex from "./components/PrivateDiscussionIndex";
import PrivateDiscussionList from "./components/PrivateDiscussionList";
import PrivateDiscussionNotification from "./components/PrivateDiscussionNotification";
import PrivateDiscussionReplyNotification from "./components/PrivateDiscussionReplyNotification";
import PrivateDiscussionsUserPage from "./components/PrivateDiscussionsUserPage";
import PrivateDiscussionUserLeftNotification from "./components/PrivateDiscussionUserLeftNotification"
import RecipientLeft from "./components/RecipientLeft";
import RecipientSearch from "./components/RecipientSearch";
import RecipientsModified from "./components/RecipientsModified";
import GroupSearchSource from "./components/sources/GroupSearchSource";
import UserSearchSource from "./components/sources/GroupSearchSource";
import recipientCountLabel from "../common/helpers/recipientCountLabel";
import recipientLabel from "../common/helpers/recipientLabel";
import recipientsLabel from "../common/helpers/recipientsLabel";


export default {
    'components/AddRecipientModal': AddRecipientModal,
    'components/PrivateDiscussionAddedNotification': PrivateDiscussionAddedNotification,
    'components/PrivateDiscussionComposer': PrivateDiscussionComposer,
    'components/PrivateDiscussionIndex': PrivateDiscussionIndex,
    'components/PrivateDiscussionList': PrivateDiscussionList,
    'components/PrivateDiscussionNotification': PrivateDiscussionNotification,
    'components/PrivateDiscussionReplyNotification':PrivateDiscussionReplyNotification,
    'components/PrivateDiscussionUserPage': PrivateDiscussionsUserPage,
    'components/PrivateDiscussionUserLeftNotification':PrivateDiscussionUserLeftNotification,
    'components/RecipientLeft': RecipientLeft,
    'components/RecipientSearch': RecipientSearch,
    'components/RecipientsModified': RecipientsModified,
    'components/sources/GroupSearchSource': GroupSearchSource,
    'components/sources/UserSearchSource': UserSearchSource,
    'helpers/recipientCountLabel': recipientCountLabel,
    'helpers/recipientLabel': recipientLabel,
    'helpers/recipientsLabel': recipientsLabel,
};
