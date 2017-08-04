const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {type: String, unique: true},
  // password: String,
  age: Number,
  gender: String,
  createTime: {type: Date, default: Date.now()}
})

const UserModel = mongoose.model('user', UserSchema)

async function addUser(request) {
  const { username, age, gender } = request.body
  if(!username || !age || !gender) {
    return {
      success: false
    }
  }
  const user = new UserModel({
    username,
    age,
    gender
  })
  return await user.save().then().catch(err => {
    throw new Error(err)
  })
}

async function getUsers() {
  return await UserModel.find({}).then().catch(e => {
    throw new Error(e)
  })
}

async function modifiedUser(req) {
  const _id = req.params.id
  const {username, age, gender} = req.body
  const update = {username, age, gender}
  for(let i in update) {
    if(update[i] === undefined) {
      delete update[i]
    }
  }
  // Object.assign(updata, {username})
  return await UserModel.findOneAndUpdate({_id: _id}, update, {new: true}).then().catch(e => {
    throw new Error(e)
  })
}

async function findSpecialUser(_id) {
  return await UserModel.findOne({_id: _id}).then().catch(e => {
    throw new Error(e)
  })
}

async function removeSingleUser(_id) {
  return await UserModel.findOneAndRemove({_id: _id})
}

module.exports = {
  addUser,
  getUsers,
  modifiedUser,
  findSpecialUser,
  removeSingleUser
}