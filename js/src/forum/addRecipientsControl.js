import { extend } from 'flarum/extend';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Button from 'flarum/components/Button';

import AddRecipientModal from './components/AddRecipientModal';

export default function() {
    // Add a control allowing the discussion to be moved to another category.
    extend(DiscussionControls, 'moderationControls', function(items, discussion) {
        if (discussion.canEditRecipients()) {
            items.add('recipients', Button.component({
                children: app.translator.trans('fof-byobu.forum.buttons.edit_recipients'),
                icon: 'far fa-map',
                onclick: () => app.modal.show(new AddRecipientModal({discussion}))
            }));
        }
    });
}
