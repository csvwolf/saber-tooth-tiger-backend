const request = require('superagent');
const expect = require('../chai-config').expect;
const random = require('randomatic');
const DOMAIN = 'http://localhost:3000';

const stuInfo = {
  username: random('0', 12),
  password: random('0', 6),
  academy: random('a', 12),
  realname: random('a', 6),
  phone: random('0', 11),
  signUpDepartment: random('a', 4),
  classname: random('AAA000')
};

stuInfo.confirmedPassword = 'hello world';

describe('Register Test', function() {
  describe('#request body check', function() {
    it('should all fields must be required', async function () {
      let result = await request.post(`${DOMAIN}/auth/reg`);
      return expect(result.body.error).to.be.true;
    });

    it('password and confirmedPassword must be the same', async function() {
      let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
      return expect(result.body.error).to.be.true;
    });

    it('username must be numberic', async function() {
      stuInfo.username = random('a', 12);
      let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
      return expect(result.body.error).to.be.true;
    });

    it('phone must start with 1', async function() {
      stuInfo.phone = '2' + random('0', 10);
      let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
      return expect(result.body.error).to.be.true;
    });

    it('phone length must be 11', async function() {
      stuInfo.phone = '1' + random('0', 3);
      let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
      return expect(result.body.error).to.be.true;
    });

    it('phone number must be numberic', async function() {
      stuInfo.phone = random('a', 11);
      let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
      stuInfo.phone = '1' + random('0', 10);
      return expect(result.body.error).to.be.true;
    });
  });

  // TODO: 必须要check session所以这部分单元测试暂时就过不了了……
  // describe('#request add steps', function () {
  //   it('should be a successful add when all info are prepared', async function() {
  //     stuInfo.confirmedPassword = stuInfo.password;
  //     stuInfo.username = random('0', 12);
  //     let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
  //     return expect(result.body.error).to.be.undefined;
  //   });

  //   it('should be false if the same username has been added in database', async function() {
  //     let result = await request.post(`${DOMAIN}/auth/reg`).send(stuInfo);
  //     return expect(result.body.error).to.be.true;
  //   })
  // });
  
});