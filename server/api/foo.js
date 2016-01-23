import router from './router';

router.get('/foo', (ctx, next) => {
  ctx.body = {
    foo: 'bar'
  };
});
