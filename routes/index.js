const express = require('express')

const router = express.Router()
const JWT = require('jsonwebtoken')
const secret = require('./../config/jwt_secret')
const { login } = require('./../models/mongo_obj/user')

router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'})
})

router.route('/login').post((req, res, next) => {
  (async () => {
    const { username } = req.body
    await login(req)
    const token = JWT.sign({username, expireTime: Date.now() + 10 * 60 * 1000}, secret)
    return {
      success: true,
      token
    }
  })().then(r => {
    res.json(r)
  }).catch(e => {
    next(e)
  })
})


module.exports = router