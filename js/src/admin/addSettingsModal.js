import SettingsModal from "@fof/components/admin/settings/SettingsModal";
import BooleanItem from "@fof/components/admin/settings/items/BooleanItem";

export default () => {
    app.extensionSettings['fof-byobu'] = () =>
        app.modal.show(
            new SettingsModal({
                title: 'Byōbu',
                size: 'medium',
                items: [
                    <BooleanItem key="fof-byobu.enable_byobu_user_page">
                        {app.translator.trans('fof-byobu.admin.settings.byobu_users_page_label')}
                    </BooleanItem>,
                ],
            })
        );
}
