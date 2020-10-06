Hey {{ $user->username }},

{{ $blueprint->actor->username }} made the private discussion '{{ $blueprint->discussion->title }}' public. It's contents are now viewable by anyone who can see the tag it's under.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }} (You may need to login first)
