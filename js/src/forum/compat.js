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


export const components = {
    'AddRecipientModal': AddRecipientModal,
    'PrivateDiscussionAddedNotification': PrivateDiscussionAddedNotification,
    'PrivateDiscussionComposer': PrivateDiscussionComposer,
    'PrivateDiscussionIndex': PrivateDiscussionIndex,
    'PrivateDiscussionList': PrivateDiscussionList,
    'PrivateDiscussionNotification': PrivateDiscussionNotification,
    'PrivateDiscussionReplyNotification': PrivateDiscussionReplyNotification,
    'PrivateDiscussionUserPage': PrivateDiscussionsUserPage,
    'PrivateDiscussionUserLeftNotification': PrivateDiscussionUserLeftNotification,
    'RecipientLeft': RecipientLeft,
    'RecipientSearch': RecipientSearch,
    'RecipientsModified': RecipientsModified,
    sources: {
        'GroupSearchSource': GroupSearchSource,
        'UserSearchSource': UserSearchSource
    }
}

export const helpers = {
    'recipientCountLabel': recipientCountLabel,
    'recipientLabel': recipientLabel,
    'recipientsLabel': recipientsLabel,
};
