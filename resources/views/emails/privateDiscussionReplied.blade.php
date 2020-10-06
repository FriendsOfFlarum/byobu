Hey {{ $user->username }},

{{ $blueprint->post->user->username }} posted in a private discussion with you as recipient, titled '{{ $blueprint->post->discussion->title }}'.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }} (You may need to login first)
