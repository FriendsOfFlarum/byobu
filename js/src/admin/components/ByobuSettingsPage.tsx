import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Badge from 'flarum/common/components/Badge';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';

import type Mithril from 'mithril';

export default class ByobuSetingsPage extends ExtensionPage {
  badgeDefault: string = 'fas fa-map';
  postActionDefault: string = 'far fa-map';

  content() {
    return (
      <div className="ByobuSettingsPage">
        <div className="container">
          <div className="ByobuSettingsTabPage ByobuSettingsPage--settings">
            <div className="Form">
              {this.settingsItems().toArray()}
              <div className="Form-group">{this.submitButton()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  settingsItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'general',
      <div className="Section">
        <h3>{app.translator.trans('fof-byobu.admin.settings.general.heading')}</h3>
        <p className="helpText">{app.translator.trans('fof-byobu.admin.settings.general.help')}</p>
        {this.generalItems().toArray()}
      </div>
    );

    items.add(
      'icon',
      <div className="Section">
        <h3>{app.translator.trans('fof-byobu.admin.settings.icon.heading')}</h3>
        <p className="helpText">{app.translator.trans('fof-byobu.admin.settings.icon.help')}</p>
        {this.iconItems().toArray()}
      </div>
    );

    return items;
  }

  generalItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'makePublic',
      this.buildSettingComponent({
        type: 'boolean',
        setting: 'fof-byobu.makePublic',
        label: app.translator.trans('fof-byobu.admin.settings.enable-make-public-option'),
        help: app.translator.trans('fof-byobu.admin.settings.enable-make-public-option-help'),
      })
    );

    items.add(
      'deleteEmpty',
      this.buildSettingComponent({
        type: 'boolean',
        setting: 'fof-byobu.delete_on_last_recipient_left',
        label: app.translator.trans('fof-byobu.admin.settings.delete_on_last_recipient_left'),
        help: app.translator.trans('fof-byobu.admin.settings.delete_on_last_recipient_left_help'),
      })
    );

    items.add(
      'hideAllDiscussions',
      this.buildSettingComponent({
        type: 'boolean',
        setting: 'fof-byobu.hide_from_all_discussions_page',
        label: app.translator.trans('fof-byobu.admin.settings.hide_from_all_discussions_page'),
        help: app.translator.trans('fof-byobu.admin.settings.hide_from_all_discussions_page_help'),
      })
    );

    return items;
  }

  iconItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'icon-badge',
      this.buildSettingComponent({
        type: 'string',
        setting: 'fof-byobu.icon-badge',
        label: app.translator.trans('fof-byobu.admin.settings.badge-icon'),
        help: (
          <div>
            <Badge icon={this.setting('fof-byobu.icon-badge').toJSON() || this.badgeDefault}></Badge> {this.helpText()}
          </div>
        ),
        placeholder: this.badgeDefault,
      })
    );

    items.add(
      'icon-postAction',
      this.buildSettingComponent({
        type: 'string',
        setting: 'fof-byobu.icon-postAction',
        label: app.translator.trans('fof-byobu.admin.settings.post-event-icon'),
        help: (
          <div>
            {icon(this.setting('fof-byobu.icon-postAction').toJSON() || this.postActionDefault)} {this.helpText()}
          </div>
        ),
        placeholder: this.postActionDefault,
      })
    );

    return items;
  }

  helpText(): Mithril.Children | null {
    return (
      flarum.extensions['flarum-tags'] &&
      app.translator.trans('flarum-tags.admin.edit_tag.icon_text', {
        a: <a href={app.refs.fontawesome} tabindex="-1" />,
      })
    );
  }
}
