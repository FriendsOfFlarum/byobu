import app from 'flarum/common/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';

export default class PrivacyGambit extends BooleanGambit {
  key() {
    return app.translator.trans('fof-byobu.lib.gambits.private.key', {}, true);
  }

  filterKey() {
    return 'private';
  }
}
