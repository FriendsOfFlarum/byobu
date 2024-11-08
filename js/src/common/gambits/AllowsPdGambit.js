import app from 'flarum/common/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';

export default class AllowsPdGambit extends BooleanGambit {
  booleanKey() {
    return 'allows';
  }

  key() {
    return app.translator.trans('fof-byobu.lib.gambits.allows-pd.key', {}, true);
  }

  filterKey() {
    return 'allows-pd';
  }
}
