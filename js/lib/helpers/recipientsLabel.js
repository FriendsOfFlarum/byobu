import extract from 'flarum/utils/extract';
import recipientLabel from 'flagrow/messaging/helpers/recipientLabel';

export default function recipientsLabel(recipients, attrs = {}) {
  const children = [];
  const link = extract(attrs, 'link');

  attrs.className = 'RecipientsLabel ' + (attrs.className || '');

  if (recipients) {
  } else {
    children.push(recipientLabel());
  }

  return <span {...attrs}>{children}</span>;
}
