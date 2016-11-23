const openpgp = require('openpgp');
openpgp.config.aead_protect = true;
openpgp.debug = true;
const Promise = require('bluebird');
const randomstring = require('randomstring').generate;

module.exports = function(number = 1) {
  const keys = new Array(number).fill(0).map(e => {
    let name = randomstring(7);
    let email = `${name}@example.com`
    return {
      userIds: [{name: name, email: email}],
      numBits: 2048,
      passphrase: randomstring()
    }
  });

  return Promise.map(keys, key => {
    return openpgp.generateKey(key)
  });
}
