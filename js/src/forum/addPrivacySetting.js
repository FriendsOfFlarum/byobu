import {extend} from 'flarum/extend';
import SettingsPage from 'flarum/components/SettingsPage';
import Switch from "flarum/components/Switch";

export default function () {
    extend(SettingsPage.prototype, 'privacyItems', function (items) {
        items.add('byobu-block-dm',
            Switch.component({
                children: app.translator.trans('fof-byobu.forum.user.settings.block_pd'),
                state: this.user.preferences().blocksPd,
                onchange: (value, component) => this.preferenceSaver('blocksPd')(value, component)
            })
        )
    });
}
