import Model from "flarum/Model";

class Message extends Model {
}

Object.assign(Message.prototype, {
    content: Model.attribute('content'),
    from: Model.hasOne('from'),
    sendAt: Model.attribute('sendAt', Model.transformDate),
    readAt: Model.attribute('readAt', Model.transformDate),
});

export default Message;
