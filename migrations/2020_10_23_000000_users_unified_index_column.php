<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'unified_index_with_byobu' => ['boolean', 'default' => false]
]);
