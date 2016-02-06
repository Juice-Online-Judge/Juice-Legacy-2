import _debug from 'debug';
import router from './router';
import auth from '../../lib/auth';

const debug = _debug('app:server:route:logout');

router.delete('/logout', (ctx, _next) => {
  debug('Logout');
  ctx.req.logout();
  ctx.status = 200;
  ctx.body = {
    success: true
  };
});
