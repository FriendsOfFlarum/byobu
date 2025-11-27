export default class PrivateComposing {
    constructor(recipient: any);
    recipient: any;
    action(e: any): Promise<any>;
    component(): Mithril.Vnode;
    get canStartDiscussion(): unknown;
}
