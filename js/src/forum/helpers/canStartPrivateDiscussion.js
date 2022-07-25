import app from 'flarum/forum/app';

export default (recipient) =>
  app.session.user &&
  app.session.user.id() !== recipient.id() &&
  app.forum.attribute('canStartPrivateDiscussion') &&
  (recipient.blocksPd() === false || (app.forum.attribute('canStartPrivateDiscussionWithBlockers') && recipient.cannotBeDirectMessaged()));
