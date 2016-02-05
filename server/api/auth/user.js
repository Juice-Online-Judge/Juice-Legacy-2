import _debug from 'debug';
import router from './router';
import auth from '../../lib/auth';
import pick from 'lodash/pick';

const debug = _debug('app:server:route:user');

router.get('/user', (ctx, next) => {
  ctx.status = 200;
  ctx.body = pick(ctx.req.user, ['id', 'username', 'email']);
});
