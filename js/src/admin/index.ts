import app from 'flarum/admin/app';

export { default as extend } from './extend';
export * from './components';

app.initializers.add('fof-byobu', () => {
  //
});
