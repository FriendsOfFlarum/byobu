import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Badge from 'flarum/common/components/Badge';
import icon from 'flarum/common/helpers/icon';

export default class ByobuSetingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.badgeDefault = 'fas fa-map';
    this.postActionDefault = 'far fa-map';
  }

  content() {
    return [
      <div className="container">
        <div className="ByobuSettingsPage">
          <div className="Form">
            <div className="Form-group">
              {this.buildSettingComponent({
                type: 'string',
                setting: 'fof-byobu.icon-badge',
                label: app.translator.trans('fof-byobu.admin.settings.badge-icon'),
                help: <Badge icon={this.setting('fof-byobu.icon-badge').toJSON() || this.badgeDefault}></Badge>,
              })}
              {this.buildSettingComponent({
                type: 'string',
                setting: 'fof-byobu.icon-postAction',
                label: app.translator.trans('fof-byobu.admin.settings.post-event-icon'),
                help: <h2>{icon(this.setting('fof-byobu.icon-postAction').toJSON() || this.postActionDefault)}</h2>,
              })}
            </div>
            {flarum.extensions['flarum-tags'] && (
              <div className="Form-group">
                <p>
                  {app.translator.trans('flarum-tags.admin.edit_tag.icon_text', {
                    a: <a href="https://fontawesome.com/icons?m=free" tabindex="-1" />,
                  })}
                </p>
              </div>
            )}
            <div className="Form-group">{this.submitButton()}</div>
          </div>
        </div>
      </div>,
    ];
  }
}
