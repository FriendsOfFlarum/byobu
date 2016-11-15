import {extend} from "flarum/extend";
import Message from "flagrow/messaging/models/Message";
import addMessagingDropdown from "flagrow/messaging/addMessagingDropdown";

app.initializers.add('flagrow-messaging', () => {
    app.store.models.messages = Message;

    addMessagingDropdown();
})
