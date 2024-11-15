import AllowsPdGambit from './gambits/AllowsPdGambit';
import PrivacyGambit from './gambits/PrivacyGambit';
import ByobuGambit from './gambits/ByobuGambit';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Search()
    .gambit('discussions', ByobuGambit)
    .gambit('discussions', PrivacyGambit)
    .gambit('users', AllowsPdGambit),
];
