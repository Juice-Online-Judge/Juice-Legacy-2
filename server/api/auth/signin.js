import _debug from 'debug';
import router from './router';
import auth from '../../lib/auth';

const debug = _debug('app:server:route:signin');

router.post('/signin', (ctx, next) => {
  return auth.authenticate('local', (user, info, status) => {
    if (user === false) {
      debug('Auth fail');
      ctx.status = 401;
      ctx.body = { success: false };
    } else {
      debug('Auth success');
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx, next);
});
