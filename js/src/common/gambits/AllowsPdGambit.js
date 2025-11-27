import app from 'flarum/common/app';
import { KeyValueGambit } from 'flarum/common/query/IGambit';

export default class AllowsPdGambit extends KeyValueGambit {
  key() {
    return app.translator.trans('fof-byobu.lib.gambits.allows-pd.key', {}, true);
  }

  hint() {
    return app.translator.trans('fof-byobu.lib.gambits.allows-pd.hint', {}, true);
  }

  filterKey() {
    return 'allows-pd';
  }
}
