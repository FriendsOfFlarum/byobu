import RecipientLeft from "./RecipientLeft";
import RecipientsModified from "./RecipientsModified";

export default (app) => {
    app.postComponents.recipientsModified = RecipientsModified;
    app.postComponents.recipientLeft = RecipientLeft;
}
