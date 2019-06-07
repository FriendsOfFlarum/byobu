export default function recipientCountLabel(count, attrs = {}) {
  attrs.style = attrs.style || {};
  attrs.className = 'RecipientLabel ' + (attrs.className || '');

  var label = app.translator.transChoice('fof-byobu.forum.labels.recipients', count, {count});

  return (
    m('span', attrs,
        <span className="RecipientLabel-text">
            {label}
        </span>
    )
  );
}
