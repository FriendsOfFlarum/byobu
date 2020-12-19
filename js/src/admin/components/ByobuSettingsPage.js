import ExtensionPage from 'flarum/components/ExtensionPage';
import Badge from 'flarum/components/Badge';
import icon from 'flarum/helpers/icon';
import { settings } from '@fof-components';

const {
    items: { BooleanItem, SelectItem, StringItem, NumberItem },
} = settings;

export default class ByobuSetingsPage extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);

        this.setting = this.setting.bind(this);

        this.badgeDefault = 'fas fa-map';
        this.postActionDefault = 'far fa-map';
    }

    content() {
        return [
            <div className="container">
                <div className="ByobuSettingsPage">
                    <div className="Form-group">
                        <label>{app.translator.trans('fof-byobu.admin.settings.badge-icon')}</label>
                        <StringItem name="fof-byobu.icon-badge" placeholder={this.badgeDefault} setting={this.setting}>
                            <Badge icon={this.setting('fof-byobu.icon-badge').toJSON() || this.badgeDefault}></Badge>
                        </StringItem>
                    </div>
                    <div className="Form-group">
                        <label>{app.translator.trans('fof-byobu.admin.settings.post-event-icon')}</label>
                        <StringItem name="fof-byobu.icon-postAction" placeholder={this.postActionDefault} setting={this.setting}>
                            <h2>{icon(this.setting('fof-byobu.icon-postAction').toJSON() || this.postActionDefault)}</h2>
                        </StringItem>
                    </div>
                    <p>
                        {app.translator.trans('flarum-tags.admin.edit_tag.icon_text', {
                            a: <a href="https://fontawesome.com/icons?m=free" tabindex="-1" />,
                        })}
                    </p>
                    <div className="Form-group">{this.submitButton()}</div>
                </div>
            </div>,
        ];
    }
}
