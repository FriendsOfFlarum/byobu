Hey {{ $user->username }},

{{ $blueprint->user->username }} left the private discussion '{{ $blueprint->discussion->title }}'. They'll no longer be able to view any of it's content.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }} (You may need to login first)
