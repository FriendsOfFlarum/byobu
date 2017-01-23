var gulp = require('flarum-gulp');

gulp({
  modules: {
    'flagrow/messaging': [
      '../lib/**/*.js',
      'src/**/*.js'
    ]
  }
});
