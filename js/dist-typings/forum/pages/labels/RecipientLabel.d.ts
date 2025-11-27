import type * as Mithril from 'mithril';
import User from 'flarum/common/models/User';
import Group from 'flarum/common/models/Group';
import Component, { ComponentAttrs } from 'flarum/common/Component';
export interface IRecipientLabelAttrs extends ComponentAttrs, Mithril.Attributes {
    recipient: User | Group;
    link: string;
}
export default class RecipientLabel extends Component<IRecipientLabelAttrs> {
    view(vnode: Mithril.Vnode): JSX.Element;
}
