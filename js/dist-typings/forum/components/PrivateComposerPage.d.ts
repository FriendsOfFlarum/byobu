import Page from 'flarum/common/components/Page';
import type Mithril from 'mithril';
export default class PrivateComposerPage extends Page {
    oninit(vnode: Mithril.Vnode): void;
    configComposer(): any;
    view(): JSX.Element;
}
