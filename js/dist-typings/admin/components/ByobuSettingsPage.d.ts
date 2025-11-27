import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
export default class ByobuSettingsPage extends ExtensionPage {
    badgeDefault: string;
    postActionDefault: string;
    content(): JSX.Element;
    settingsItems(): ItemList<Mithril.Children>;
    generalItems(): ItemList<Mithril.Children>;
    iconItems(): ItemList<Mithril.Children>;
    helpText(): Mithril.Children | null;
}
