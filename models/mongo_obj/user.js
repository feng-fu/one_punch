
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const crypto = require('crypto')
global.Promise = require('bluebird')
const pbkdf2Async = Promise.promisify(crypto.pbkdf2)
// crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
const { salt, iterations, keylen, digest } = require('../../config/verify')
//  1 创建用户，使用pbkdf2加密 -->  2 用户登录 通过加密进行比对   --> 3 为成功通过登录的用户通过JWT方式生成token

const UserSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  age: Number,
  gender: String,
  createTime: {type: Date, default: Date.now()}
})

const UserModel = mongoose.model('user', UserSchema)

const User = {
  async removeSingleUser (_id) {
    return await UserModel.findOneAndRemove({_id: _id})
  },
  async modifiedUser(req) {
    const _id = req.params.id
    const {username, age, gender} = req.body
    const update = {username, age, gender}
    for(let i in update) {
      if(update[i] === undefined) {
        delete update[i]
      }
    }
    return await UserModel.findOneAndUpdate({_id: _id}, update, {new: true}).then().catch(e => {
      throw new Error(e)
    })
  },
  async getUsers() {
    return await UserModel.find({}).then().catch(e => {
      throw new Error(e)
    })
  },
  async addUser(request) {
    const { username, age, gender, password } = request.body
    if(!username || !age || !gender || !password) {
      return {
        success: false
      }
    }
    const pass = await pbkdf2Async(password, salt, iterations, keylen, digest)
    console.log(pass)
    const user = new UserModel({
      username,
      age,
      gender,
      password: pass.toString()
    })
    return await user.save()
  },
  async login(req) {
    const { username, password } = req.body
    if(!username || !password ) throw new Error('no enough msg.')
    const pass = await pbkdf2Async(password, salt, iterations, keylen, digest)
    await UserModel.find({
      username,
      password: pass.toString()
    }).then(r => {
      if(!r.length) throw new Error('not match user.')
    }).catch(e => {
      throw new Error('error login.')
    })
  }
}

module.exports = User