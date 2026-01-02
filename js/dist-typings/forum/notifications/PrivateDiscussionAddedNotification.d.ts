import Notification from 'flarum/forum/components/Notification';
export default class PrivateDiscussionAddedNotification extends Notification {
    icon(): string;
    href(): string;
    content(): any[];
    excerpt(): null;
}
