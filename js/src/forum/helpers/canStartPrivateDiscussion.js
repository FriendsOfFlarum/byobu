import app from 'flarum/forum/app';

export default function canStartPrivateDiscussion(recipient) {
  return (
    app.session.user &&
    app.session.user.id() !== recipient.id() &&
    app.forum.attribute('canStartPrivateDiscussion') &&
    (!recipient.blocksPd() || (app.forum.attribute('canStartPrivateDiscussionWithBlockers') && recipient.cannotBeDirectMessaged()))
  );
}
