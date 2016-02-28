import Bugsnag from 'bugsnag';
import Winston from 'winston';
import util from 'util';

/**
 * @module bugsnag-winston
 */

export default function BugsnagWinston (opts) {
  this.name = 'bugsnag';
  this.level = opts.level || 'error';

  const bugsnagOpts = opts.bugsnag || {};

  Bugsnag.register(opts.apiKey, Object.assign({}, bugsnagOpts));
}

util.inherits(BugsnagWinston, Winston.Transport);

BugsnagWinston.prototype.log = function log (level, msg, meta, cb) {
  Bugsnag.notify(msg, {
    severity: level,
    meta
  }, () => cb(null, true));
};


