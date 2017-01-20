
import Component from 'flarum/components/Component';

export default class Selectize extends Component {
    init() {
    }

    view() {
        return [
            <select placeholder="">
                {app.translator.trans('flagrow-messaging.forum.recipient_modal.search_placeholder')}
            </select>
        ];
    }
}
