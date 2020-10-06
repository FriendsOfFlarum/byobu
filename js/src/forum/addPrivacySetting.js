import { extend } from 'flarum/extend';
import SettingsPage from 'flarum/components/SettingsPage';
import Switch from 'flarum/components/Switch';

export default function () {
    extend(SettingsPage.prototype, 'privacyItems', function (items) {
        items.add(
            'byobu-block-dm',
            Switch.component({
                state: this.user.preferences().blocksPd,
                onchange: (value) => {
                    this.blocksPdLoading = true;

                    this.user.savePreferences({ blocksPd: value }).then(() => {
                        this.blocksPdLoading = false;
                        m.redraw();
                    });
                },
                loading: this.blocksPdLoading
            }, app.translator.trans('fof-byobu.forum.user.settings.block_pd'))
        );
    });
}
