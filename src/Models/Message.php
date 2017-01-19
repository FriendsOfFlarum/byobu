<?php

namespace Flagrow\Messaging\Models;

use Carbon\Carbon;
use Flarum\Core\User;
use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property string $content
 * @property int $to_id
 * @property int $from_id
 * @property User $to
 * @property User $from
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property array $read_registration
 */
class Message extends AbstractModel
{
    protected $table = 'flagrow_messages';

    protected $casts = [
        'read_registration' => 'json'
    ];

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
