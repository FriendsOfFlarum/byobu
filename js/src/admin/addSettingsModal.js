import { settings } from '@fof-components';

const { SettingsModal, items: { BooleanItem, StringItem } } = settings;

export default () => {
    app.extensionSettings['fof-byobu'] = () =>
        app.modal.show(
            new SettingsModal({
                title: 'FoF Byōbu',
                size: 'medium',
                items: [
                    <StringItem key="fof-byobu.use_tag_slug">
                        {app.translator.trans('fof-byobu.admin.settings.use_tag_slug')}
                    </StringItem>,
                    <p>{app.translator.trans('fof-byobu.admin.settings.use_tag_slug_help')}</p>,
                ],
            })
        );
}
