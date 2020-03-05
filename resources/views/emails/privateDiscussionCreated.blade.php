Hey {{ $user->username }}!

{{ $blueprint->discussion->user->username }} started a new private discussion with you as recipient, titled '{{ $blueprint->discussion->title }}'.

View it here: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }}
