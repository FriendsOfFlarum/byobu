<?php

namespace Flagrow\Messaging\Models;

use Carbon\Carbon;
use Flarum\Core\User;
use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property int $discussion_id
 * @property int $author_id
 * @property string $message
 * @property Discussion $discussion
 * @property User $author
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Message extends AbstractModel
{
    protected $table = 'flagrow_private_messages';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
