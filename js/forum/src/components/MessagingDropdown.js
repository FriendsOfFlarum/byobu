import NotificationsDropdown from "flarum/components/NotificationsDropdown";
import MessageList from "flagrow/messaging/components/MessageList";

export default class MessagingDropdown extends NotificationsDropdown {
    static initProps(props) {
        props.label = props.label || app.translator.trans('flagrow-messaging.forum.labels.pm_dropdown');
        props.icon = props.icon || 'inbox';

        super.initProps(props);
    }

    init() {
        super.init();

        this.list = new MessageList();
    }

    goToRoute() {
        m.route(app.route('flagrow.messaging.notifications'));
    }

    /**
     * @returns {number}
     */
    getUnreadCount() {
        return app.cache.userMessages ? app.cache.userMessages.length : app.forum.attribute('flagrow.userMessages');
    }

    /**
     * @returns {number}
     */
    getNewCount() {
        return app.session.user.attribute('newMessagesCount');
    }
}
