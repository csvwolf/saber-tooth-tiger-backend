const router = require('koa-router')();
const User = require('../model/User');
const getUserInfo = require('../lib/get-student-info');
const crypto = require('../lib/crypto');

const checkEmpty = async function(ctx, next) {
  ctx.reqBody = {};
  const checkedList = ['password', 'confirmedPassword', 'phone', 'signUpDepartment'];
  Object.keys(ctx.request.body).map(key => ctx.reqBody[key] = ctx.request.body[key].trim());

  let isEmpty = checkedList.every(key => !ctx.reqBody[key]);
  if (isEmpty || !ctx.session.username) ctx.body = { error: true };
  else await next();
};

const checkValidate = async function(ctx, next) {
  let {
    password,
    confirmedPassword,
    phone,
  } = ctx.reqBody;

  const error = password !== confirmedPassword || !/^1\d{10}/.test(phone);
  const result = await User.findUser({ username: ctx.session.username });
  if (error || result) ctx.body = { error: true};
  else await next();
};

router.post('/login', async function(ctx) {
  ctx.body = {
    success: true
  };
});

router.post('/get-student-info',async function(ctx) {
  let stuInfo;
  try {
    stuInfo = await getUserInfo(ctx.request.body.username, ctx.request.body.password);
  } catch(e) {
    ctx.body = {
      error: true
    };

    ctx.session = {};

    return;
  }

  ctx.session.username = stuInfo['学号'];
  ctx.session.realname = stuInfo['姓名'];
  ctx.session.academy = stuInfo['院系'];
  ctx.session.grade = stuInfo['年级'];
  ctx.session.major = stuInfo['专业'];
  ctx.session.classname = stuInfo['班级'];

  ctx.body = {
    username: stuInfo['学号'],
    realname: stuInfo['姓名'],
    academy: stuInfo['院系'],
    grade: stuInfo['年级'],
    major: stuInfo['专业'],
    classname: stuInfo['班级']
  };
  
});

router.post('/reg', checkEmpty, checkValidate, async function(ctx) {
  let {
    password,
    phone,
    signUpDepartment
  } = ctx.reqBody;

  let { username, academy, grade, major, classname, realname } = ctx.session;

  ctx.body = await User.createUser({ username, password: crypto(password), academy, grade, major, classname, realname, phone, signUpDepartment: [signUpDepartment] });
});

module.exports = router;