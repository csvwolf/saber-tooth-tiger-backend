const router = require('koa-router')();

router.get('/', async function (ctx) {
  ctx.body = {
    'hello': 'world'
  };
});
module.exports = router;
