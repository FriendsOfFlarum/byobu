import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import textContrastClass from 'flarum/common/helpers/textContrastClass';
import classList from 'flarum/common/utils/classList';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

export default class PrivateHero extends Component {
  view() {
    const color = this.heroColor();

    return (
      <header
        className={classList('Hero', 'PrivateHero', { 'PrivateHero--colored': color, [textContrastClass(color)]: color })}
        style={color ? { '--hero-bg': color } : undefined}
      >
        <div className="container">{this.viewItems().toArray()}</div>
      </header>
    );
  }

  viewItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add('content', <div className="containerNarrow">{this.contentItems().toArray()}</div>, 80);

    return items;
  }

  contentItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'private-discussions-title',
      <h1 className="Hero-title">
        {icon(this.heroIcon())} {app.translator.trans('fof-byobu.forum.hero.title')}
      </h1>,
      100
    );

    // Don't think a subtitle is necessary, but can be added if needed.
    //items.add('private-discussions-subtitle', <div className="Hero-subtitle">{app.translator.trans('fof-byobu.forum.hero.subtitle')}</div>, 90);

    return items;
  }

  heroColor(): string | null {
    // Example return a color string to display a colored hero
    //return app.forum.attribute<string>('themeSecondaryColor');
    return null;
  }

  heroIcon(): string {
    return app.forum.data.attributes?.['byobu.icon-badge'] as string;
  }
}
