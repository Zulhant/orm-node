const jwt = require('jsonwebtoken');
const { screetKey } = require('../../config');
const jwtSign =jwt.sign
const jwtVerify =jwt.verify


exports.sign = (id, options = { expiresIn : '1h' }, method = jwtSign) =>
  method({ id }, screetKey, options)

exports.signSync = (id, options) => sign(id, options , jwtSign)

exports.verify = (token) => jwtVerify(token, screetKey)

