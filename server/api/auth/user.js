import _debug from 'debug';
import router from './router';
import pick from 'lodash/pick';

const debug = _debug('app:server:route:user');

router.get('/user', (ctx, next) => {
  ctx.status = 200;
  if (ctx.isAuthenticated()) {
    debug('get user data');
    ctx.body = {user: pick(ctx.req.user, ['id', 'username', 'email'])};
  } else {
    debug('user not login');
    ctx.body = {user: null};
  }
});
