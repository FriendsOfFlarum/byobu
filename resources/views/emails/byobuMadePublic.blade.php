Hey {{ $user->username }},

{{ $blueprint->actor->username }} made the private discussion '{{ $blueprint->discussion->title }}' public. It's contents are now publically visible.

View it here: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }}
