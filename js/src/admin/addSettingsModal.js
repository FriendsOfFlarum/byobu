import { settings } from '@fof-components';

const {
    SettingsModal,
    items: { BooleanItem, SelectItem },
} = settings;

function visualiseTags() {
    let secondaryTags = {};

    const tags = app.store
        .all('tags')
        .sort((a, b) => a.data.attributes.position - b.data.attributes.position)
        .reduce((options, object) => {
            if (object.position() === null) {
                return options;
            }

            if (object.isChild()) {
                if (typeof secondaryTags[object.data.relationships.parent.data.id] === 'undefined') {
                    secondaryTags[object.data.relationships.parent.data.id] = [object.data.id];
                } else {
                    secondaryTags[object.data.relationships.parent.data.id].push(object.data.id);
                }
            } else {
                options[object.slug()] = object.name();
            }

            return options;
        }, {});

    let options = {
        '': app.translator.trans('fof-byobu.admin.settings.use_tag_slug_no_restriction'),
    };

    for (const prop in tags) {
        options[prop] = tags[prop];

        const tag = app.store.getBy('tags', 'slug', prop);

        if (tag.isPrimary() && typeof secondaryTags[tag.data.id] !== 'undefined') {
            secondaryTags[tag.data.id].forEach((subTagId) => {
                const subTag = app.store.getBy('tags', 'id', subTagId);

                // Add "fancy" graphics for child tags
                // (that space at the start is a double width em space for better displaying)
                options[subTag.slug()] = ' └─ ' + subTag.name();
            });
        }
    }

    return options;
}

export default () => {
    app.extensionSettings['fof-byobu'] = () =>
        app.modal.show(SettingsModal, {
            title: 'FoF Byōbu',
            size: 'medium',
            items: e => [
                <BooleanItem setting={e} name="fof-byobu.index_link">{app.translator.trans('fof-byobu.admin.settings.byobu_index')}</BooleanItem>,
                <p>{app.translator.trans('fof-byobu.admin.settings.byobu_index_help')}</p>,
                <div className="Form-group">
                    <label>{app.translator.trans('fof-byobu.admin.settings.use_tag_slug')}</label>

                    {SelectItem.component({
                        options: visualiseTags(),
                        name: 'fof-byobu.use_tag_slug',
                        setting: e,
                        required: false,
                    })}
                </div>,
                <p>
                    {app.translator.trans('fof-byobu.admin.settings.use_tag_slug_help', {
                        no_restriction: app.translator.trans('fof-byobu.admin.settings.use_tag_slug_no_restriction'),
                    })}
                </p>,
            ],
        }
        );
};
