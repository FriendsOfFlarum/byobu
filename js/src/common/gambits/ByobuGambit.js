import app from 'flarum/common/app';
import { KeyValueGambit } from 'flarum/common/query/IGambit';

export default class ByobuGambit extends KeyValueGambit {
  key() {
    return app.translator.trans('fof-byobu.lib.gambits.byobu.key', {}, true);
  }

  hint() {
    return app.translator.trans('fof-byobu.lib.gambits.byobu.hint', {}, true);
  }

  filterKey() {
    return 'byobu';
  }
}
