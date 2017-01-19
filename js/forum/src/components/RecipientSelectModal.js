import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class RecipientSelectModal extends Modal
{
    className() {
        return 'RecipientSelectModal Modal--small';
    }

    title() {
        return app.translator.trans('flagrow-messaging.forum.recipient-modal.title');
    }
    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p className="helpText">{app.translator.trans('flagrow-messaging.forum.recipient-modal.help')}</p>
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            children: app.translator.trans('flagrow-messaging.forum.recipient-modal.submit')
                        })}
                    </div>
                </div>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

    }
}
