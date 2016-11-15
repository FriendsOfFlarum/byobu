import {extend} from "flarum/extend";
import app from "flarum/app";
import HeaderSecondary from "flarum/components/HeaderSecondary";
import MessagingDropdown from "flagrow/components/MessagingDropdown";


export default function () {
    extend(HeaderSecondary.prototype, 'items', function (items) {
        if (app.forum.attribute('canMessage')) {
            items.add('messaging', <MessagingDropdown/>);
        }
    })
}
