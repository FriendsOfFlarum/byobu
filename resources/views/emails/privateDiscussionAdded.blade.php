Hey {{ $user->username }},

{{ $blueprint->actor->username }} added you to an existing private discussion, titled '{{ $blueprint->discussion->title }}'.

View it here: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }}
