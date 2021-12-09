import app from 'flarum/forum/app';
import RecipientLeft from './RecipientLeft';
import RecipientsModified from './RecipientsModified';

export default () => {
  app.postComponents.recipientsModified = RecipientsModified;
  app.postComponents.recipientLeft = RecipientLeft;
};
