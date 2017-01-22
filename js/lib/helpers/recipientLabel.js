import extract from 'flarum/utils/extract';

export default function recipientLabel(tag, attrs = {}) {
  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');

  const link = extract(attrs, 'link');

  if (tag) {
    const color = tag.color();
    if (color) {
      attrs.style.backgroundColor = attrs.style.color = color;
      attrs.className += ' colored';
    }

    if (link) {
      attrs.title = tag.description() || '';
      attrs.href = app.route('user', {user: user.slug()});
      attrs.config = m.route;
    }
  } else {
    attrs.className += ' none';
  }

  return (
    m((link ? 'a' : 'span'), attrs,
      <span className="RecipientLabel-text">
        {user ? user.username() : app.translator.trans('flagrow-messaging.forum.labels.lib.user_deleted')}
      </span>
    )
  );
}
