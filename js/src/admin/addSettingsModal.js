import { settings } from '@fof-components';
import Badge from 'flarum/components/Badge';

const {
    SettingsModal,
    items: { BooleanItem, StringItem, SelectItem },
} = settings;

export default () => {
    app.extensionSettings['fof-byobu'] = () =>
        app.modal.show(
            new SettingsModal({
                title: 'FoF Byōbu',
                size: 'medium',
                items: [
                    <BooleanItem key="fof-byobu.index_link">{app.translator.trans('fof-byobu.admin.settings.byobu_index')}</BooleanItem>,
                    <p>{app.translator.trans('fof-byobu.admin.settings.byobu_index_help')}</p>,
                    <div className="Form-group">
                        <label>{app.translator.trans('fof-byobu.admin.settings.use_tag_slug')}</label>

                        {SelectItem.component({
                            options: app.store.all('tags').reduce((options, object) => {
                                if (object.isChild() || object.position() === null) {
                                    return options;
                                }
                                options[object.slug()] = object.name();

                                return options;
                            }, {}),
                            key: 'fof-byobu.use_tag_slug',
                            required: false,
                        })}
                    </div>,
                    <p>{app.translator.trans('fof-byobu.admin.settings.use_tag_slug_help')}</p>,
                ],
            })
        );
};
