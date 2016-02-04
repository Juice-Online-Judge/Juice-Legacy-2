import Router from 'koa-router';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import authRouter from './auth';
import _debug from 'debug';

const debug = _debug('app:server:api:router');

const router = new Router({
  prefix: '/api'
});

router.use(convert(bodyParser()));
router.use(convert(json()));

router.use('/auth', authRouter.routes(), authRouter.allowedMethods());
router.use((ctx, next) => {
  if (ctx.isAuthenticated()) {
    debug('It\'s auth');
    return next();
  } else {
    debug('Not auth');
    ctx.status = 403;
  }
});

export default router;
