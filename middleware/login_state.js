const JWT = require('jsonwebtoken')
const secret = require('../config/jwt_secret')
// 揭秘




const permissionVerify = function(options) {
  return function(req, res, next) {
    try{
      const token = req.get('authorization').split(' ')
      if(!token || token.length < 1) throw new Error('error token')
      const obj = JWT.verify(token[1], secret)
      if(!obj || !obj.expireTime || !obj.username) throw new Error('no access')
      if(obj.expireTime < Date.now()) throw new Error('token out time.')
      Object.defineProperty(req, 'username', {value: obj.username})
      next()
    } catch(e) {
      throw new Error(e.message)
    }
  }
}

module.exports = permissionVerify