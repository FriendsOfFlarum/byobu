import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Switch from 'flarum/common/components/Switch';

export default () => {
  privacyToggle();
};

function privacyToggle() {
  extend('flarum/forum/components/SettingsPage', 'privacyItems', function (items) {
    items.add(
      'byobu-block-dm',
      Switch.component(
        {
          state: this.user.blocksPd(),
          onchange: (value) => {
            this.blocksPdLoading = true;

            this.user.save({ blocksPd: value }).then(() => {
              this.blocksPdLoading = false;
              m.redraw();
            });
          },
          loading: this.blocksPdLoading,
        },
        app.translator.trans('fof-byobu.forum.user.settings.block_pd')
      )
    );
  });
}
