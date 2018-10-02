import DiscussionList from 'flarum/components/DiscussionList';

export default class PrivateDiscussionList extends DiscussionList
{
    /**
     * Load a new page of discussion results.
     *
     * @param {Integer} offset The index to start the page at.
     * @return {Promise}
     */
    loadResults(offset) {
        const preloadedDiscussions = app.preloadedDocument();

        if (preloadedDiscussions) {
            return m.deferred().resolve(preloadedDiscussions).promise;
        }

        const params = this.requestParams();
        params.q = 'q=is:private';
        params.page = {offset};
        params.include = params.include.join(',');

        return app.store.find('discussions', params);
    }
}
