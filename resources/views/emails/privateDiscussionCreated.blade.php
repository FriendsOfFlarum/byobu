Hey {{ $user->username }},

{{ $blueprint->discussion->user->username }} started a new private discussion with you as recipient, titled '{{ $blueprint->discussion->title }}'.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }} (You may need to login first)
