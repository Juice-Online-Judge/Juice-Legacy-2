import Router from 'koa-router';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

const router =  new Router({
  prefix: '/api'
});

router.use(convert(bodyParser()));

export default router;
