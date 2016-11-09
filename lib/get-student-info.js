const Agent = require('superagent').agent;

const CAS_ROOT = 'https://cas.shmtu.edu.cn/cas';
const URL = 'http://58.40.126.16:8000/shmtu/student/student-info/student-info-manage!index.action';

function LoginDeniedError() {
  this.message = 'login denied';
  this.stack = new Error().stack;
}
LoginDeniedError.prototype = Object.create(Error.prototype);
LoginDeniedError.prototype.name = 'LoginDeniedError';

function ParseError() {
  this.message = 'login denied';
  this.stack = new Error().stack;
}
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.name = 'ParseError';

function getExtraLoginParamaters(html) {
  return {
    lt: html.match(/name="lt"[^"]+"([^"]+)/)[1],
    execution: html.match(/name="execution"[^"]+"([^"]+)/)[1],
    _eventId: 'submit'
  };
}

function parseStudentInfo(html) {
  const pattern = /"infor_td_left(?:_A|_B)? [^>]+>(.*?)<\/td>(?:[\s\S]+?)"infor_td_right">(.*?)<\/td>/g;
  if (!pattern.test(html)) throw new ParseError('failed to parse student info');
  let match;
  const result = {};
  /* eslint-disable */
  while (match = pattern.exec(html)) {
    var [, name, value] = match;
    result[name.replace(/\s/g, '')] = value;
  }
  return result;
}

module.exports = function (username, password) {
  const loginUrl = CAS_ROOT + '/login?service=' + encodeURIComponent(URL);
  const request = new Agent();
  return request.get(loginUrl)
    .then(response => getExtraLoginParamaters(response.text))
    .then(extraParameters => request.post(loginUrl)
      .type('form')
      .send({ username, password })
      .send(extraParameters))
    .then(response => {
      if (!response.redirects.length) throw new LoginDeniedError();
      return response;
    })
    .then(response => parseStudentInfo(response.text));
};