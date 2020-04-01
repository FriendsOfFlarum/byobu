Hey {{ $user->username }},

{{ $blueprint->post->user->username }} posted in a private discussion with you as recipient, titled '{{ $blueprint->post->discussion->title }}'.

View it here: {{ app()->url() }}/d/{{ $blueprint->post->discussion->id }}-{{ $blueprint->post->discussion->slug }}/{{ $blueprint->post->number }}
