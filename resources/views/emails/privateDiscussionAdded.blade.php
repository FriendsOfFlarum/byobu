Hey {{ $user->username }},

{{ $blueprint->actor->username }} added you to an existing private discussion, titled '{{ $blueprint->discussion->title }}'.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }} (You may need to login first)
