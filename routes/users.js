var router = require('koa-router')();

router.get('/', function (ctx) {
  ctx.body = 'this a users response!';
});

module.exports = router;
