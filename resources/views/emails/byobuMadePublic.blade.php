Hey {{ $user->username }},

{{ $blueprint->actor->username }} made the private discussion '{{ $blueprint->discussion->title }}' public. It's contents are now viewable by anyone who can see the tag it's under.

View it here: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }} (You may need to login first)
