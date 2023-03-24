import app from 'flarum/forum/app';
import EventPost from 'flarum/forum/components/EventPost';

export default class RecipientLeft extends EventPost {
  static initAttrs(attrs: any) {
    super.initAttrs(attrs);
  }

  icon() {
    return app.forum.attribute<string>('byobu.icon-postAction');
  }

  descriptionKey() {
    return 'fof-byobu.forum.post.recipients_modified.removed_self';
  }
}
