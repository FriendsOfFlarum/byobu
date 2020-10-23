import { extend } from 'flarum/extend';
import SettingsPage from 'flarum/components/SettingsPage';
import Switch from 'flarum/components/Switch';

export default (app) => {
    privacyToggle(app);
    unifiedIndexToggle(app);
}

function unifiedIndexToggle(app) {
    extend(SettingsPage.prototype, 'privacyItems', function (items) {
        items.add(
            'byobu-unified-index',
            Switch.component({
                state: this.user.unifiedIndex(),
                onchange: (value) => {
                    this.unifiedIndexLoading = true;

                    this.user.save({ unifiedIndex: value }).then(() => {
                        this.unifiedIndexLoading = false;
                        m.redraw();
                    });
                },
                loading: this.unifiedIndexLoading
            }, app.translator.trans('fof-byobu.forum.user.settings.unified_index'))
        );
    });
}

function privacyToggle(app) {
    extend(SettingsPage.prototype, 'privacyItems', function (items) {
        items.add(
            'byobu-block-dm',
            Switch.component({
                state: this.user.blocksPd(),
                onchange: (value) => {
                    this.blocksPdLoading = true;

                    this.user.save({ blocksPd: value }).then(() => {
                        this.blocksPdLoading = false;
                        m.redraw();
                    });
                },
                loading: this.blocksPdLoading
            }, app.translator.trans('fof-byobu.forum.user.settings.block_pd'))
        );
    });
}
