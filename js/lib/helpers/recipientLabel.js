import extract from 'flarum/utils/extract';
import username from 'flarum/helpers/username';

export default function recipientLabel(user, attrs = {}) {
  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');

  const link = extract(attrs, 'link');

  if (user) {

    if (link) {
      attrs.title = user.username() || '';
      attrs.href = app.route.user(user);
      attrs.config = m.route;
    }
  } else {
    attrs.className += ' none';
  }

  return (
    m((link ? 'a' : 'span'), attrs,
      <span className="RecipientLabel-text">
        {user ? username(user) : app.translator.trans('flagrow-byobu.forum.labels.user_deleted')}
      </span>
    )
  );
}
