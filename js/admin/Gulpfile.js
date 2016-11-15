var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/messaging': [
            'src/**/*.js'
        ]
    }
});
