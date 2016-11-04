const crypto = require('crypto');
const secret = 'hello-world';

module.exports = function(str) {
  return crypto.createHmac('sha256', secret)
              .update(str)
              .digest('hex');
};