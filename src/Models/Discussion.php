<?php

namespace Flagrow\Messaging\Models;

use Carbon\Carbon;
use Flarum\Core\User;
use Flarum\Database\AbstractModel;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property int $id
 * @property int $owner_id
 * @property User $owner
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property Collection|User[] $recipients
 * @property Collection|Message[] $messages
 */
class Discussion extends AbstractModel
{
    protected $table = 'flagrow_private_discussions';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function recipients()
    {
        return $this->belongsToMany(
            User::class,
            'flagrow_private_recipients'
        )
            ->withPivot('last_message_read_at');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasMany(
            Message::class
        );
    }
}
