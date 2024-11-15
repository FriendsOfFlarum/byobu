import app from 'flarum/common/app';

app.initializers.add('', () => {
  console.log('[] Hello, forum and admin!');
});
