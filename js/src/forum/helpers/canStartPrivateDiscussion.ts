import app from 'flarum/forum/app';
import type User from 'flarum/common/models/User';

export default function canStartPrivateDiscussion(recipient: User) {
  return (
    app.session.user &&
    app.session.user.id() !== recipient.id() &&
    app.forum.attribute<boolean>('canStartPrivateDiscussion') &&
    (!recipient.blocksPd() || app.forum.attribute<boolean>('canStartPrivateDiscussionWithBlockers'))
  );
}
