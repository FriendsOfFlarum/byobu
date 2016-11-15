import NotificationsDropdown from "flarum/components/NotificationsDropdown";

export default class MessagingDropdown extends NotificationsDropdown {
    static initProps(props) {
        props.label = props.label || app.translator.trans('flagrow-messaging.forum.labels.pm_dropdown');
        props.icon = props.icon || 'comments-o';

        super.initProps(props);
    }

    init() {
        super.init();
    }

    goToRoute() {

    }

    /**
     *
     * @returns {number}
     */
    getUnreadCount() {
        return app.cache.userMessages ? app.cache.userMessages.length : app.forum.attribute('flagrow.userMessages');
    }

    /**
     *
     * @returns {number}
     */
    getNewCount() {
        return app.session.user.attribute('newMessagesCount');
    }
}
