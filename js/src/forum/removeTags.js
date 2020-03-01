import { extend, override } from "flarum/extend";
import PrivateDiscussionComposer from "./components/PrivateDiscussionComposer";

export default function () {
    PrivateDiscussionComposer.prototype.tags = [];

    extend(PrivateDiscussionComposer.prototype, 'headerItems', function (items) {
        items.remove('tags');
    });

    override(PrivateDiscussionComposer.prototype, 'onsubmit', function (original) {
        const tag = app.store.getBy('tags', 'slug', app.forum.attribute('byobuTag'));

        this.tags = [tag];

        original();
    });

    extend(PrivateDiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.tags = this.tags;
    });
}
