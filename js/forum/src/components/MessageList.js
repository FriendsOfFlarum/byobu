import Component from "flarum/Component";
import LoadingIndicator from "flarum/components/LoadingIndicator";
import avatar from "flarum/helpers/avatar";
import username from "flarum/helpers/username";
import icon from "flarum/helpers/icon";
import humanTime from "flarum/helpers/humanTime";

export default class MessageList extends Component {
    init() {
        /**
         * Whether or not the notifications are loading.
         *
         * @type {Boolean}
         */
        this.loading = false;
    }

    view() {
        const messages = app.cache.userMessages || [];

        return (
            <div className="NotificationList FlagList">
                <div className="NotificationList-header">
                    <h4 className="App-titleControl App-titleControl--text">{app.translator.trans('flagrow-messaging.forum.dropdown.title')}</h4>
                </div>
                <div className="NotificationList-content">
                    <ul className="NotificationGroup-content">
                        {messages.length ? messages.map(message => {
                            const from = message.from();

                            return (
                                <li>
                                    <a className="Notification Message" config={function (element, isInitialized) {
                                        m.route.apply(this, arguments);
                                    }}>
                                        {avatar(from.user())}
                                        {icon('comments-o', {className: 'Message-icon'})}
                                        <span className="Message-content">
                                            {app.translator.trans('flagrow-messaging.forum.dropdown.message_received_from', {
                                                username: username(from()), em: <em/>
                                            })}
                                        </span>
                                        {humanTime(message.sendAt())}
                                        <div className="Message-excerpt">
                                            {message.contentPlain()}
                                        </div>
                                    </a>
                                </li>
                            );
                        }) : !this.loading
                            ? <div
                            className="Message-empty">{app.translator.trans('flagrow-messaging.forum.dropdown.no_messages')}</div>
                            : LoadingIndicator.component({className: 'LoadingIndicator--block'})}
                    </ul>
                </div>
            </div>
        );
    }

    /**
     * Load flags into the application's cache if they haven't already
     * been loaded.
     */
    load() {
        if (app.cache.messages && !app.session.user.attribute('newMessagesCount')) {
            return;
        }

        this.loading = true;
        m.redraw();

        app.store.find('messages')
            .then(messages => {
                app.session.user.pushAttributes({newMessagesCount: 0});
                app.cache.messages = messages.sort((a, b) => b.sendAt() - a.sendAt());
            })
            .catch(() => {
            })
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
