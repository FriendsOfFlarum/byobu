<?php

namespace Flagrow\Messaging\Models;

use Carbon\Carbon;
use Flarum\Core\User;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property text $content
 * @property int $to_id
 * @property int $from_id
 * @property User $to
 * @property User $from
 * @property Carbon $created_at
 * @property Carbon $read_at
 * @property Carbon $updated_at
 */
class Message extends Model
{

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function to()
    {
        return $this->belongsTo(User::class, 'to_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function from()
    {
        return $this->belongsTo(User::class, 'from_id');
    }
}
