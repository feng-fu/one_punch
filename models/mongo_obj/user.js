
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
}

module.exports = User