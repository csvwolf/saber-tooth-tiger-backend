const router = require('koa-router')();
const User = require('../model/User');
const crypto = require('../lib/crypto');

const checkEmpty = async function(ctx, next) {
  ctx.reqBody = {};
  const checkedList = ['username', 'password', 'confirmedPassword', 'academy', 'classname', 'realname', 'phone', 'signUpDepartment'];
  Object.keys(ctx.request.body).map(key => ctx.reqBody[key] = ctx.request.body[key].trim());

  let isEmpty = checkedList.reduce((isEmpty, key) => isEmpty || !ctx.reqBody[key], false);
  if (isEmpty) ctx.body = { error: true };
  else await next();
};

const checkValidate = async function(ctx, next) {
  let {
    username,
    password,
    confirmedPassword,
    phone,
  } = ctx.reqBody;

  const error = password !== confirmedPassword || !/^1\d{10}/.test(phone) || !/^\d+$/.test(username);
  const result = await User.findUser({username});
  if (error || result) ctx.body = { error: true};
  else await next();
};

router.post('/login', async function(ctx) {
  ctx.body = {
    success: true
  };
});

router.post('/reg', checkEmpty, checkValidate, async function(ctx) {
  let {
    username,
    password,
    academy,
    classname,
    realname,
    phone,
    signUpDepartment
  } = ctx.reqBody;
  ctx.body = await User.createUser({username, password: crypto(password), academy, classname, realname, phone, signUpDepartment: [signUpDepartment]});
});

module.exports = router;