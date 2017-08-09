const mongoose = require('mongoose')

const ReplySchemea = new mongoose.Schema({
  content: String,
  creater: String,
  creat_time: {default: Date.now(), type: Date}
})

const TopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  creater: String,
  create_time: {default: Date.now(), type: Date},
  reply: [ReplySchemea]
})

const TopicModel = mongoose.model('topic', TopicSchema)
const Topic = {
  async addReply(req) {
    const username = req.username
    const id = req.params.id
    const { reply } = req.body
    if(!reply) {
      return {
        success: false,
        error: 'not found assign topic.'
      }
    }
    const reply_content = {
      content: reply,
      creater: username
    }
    return await TopicModel.findOneAndUpdate({_id:id}, {$push: {reply: reply_content}}, {new: true})
  },
  async removeSingleTopic(topic_id) {
    return await TopicModel.findOneAndRemove({_id: topic_id}).then().catch(e => {
      throw new Error(e)
    })
  },
  async getSingleTopic(topic_id) {
    return await TopicModel.findOne({_id: topic_id})
  },
  async addTopic(req) {
    const creater = req.username
    const { title, content } = req.body
    if(!title || !content ) {
      return {
        success: false,
        msg: 'not provide enough msg.'
      }
    }
    return await TopicModel.create({
      title, content, creater
    })
  },
  async modifiedTopic(req) {
    const _id = req.params.id
    const { title, content } = req.body
    const update = { title, content }
    
    for(let i in update) {
      if(update[i] === undefined) {
        delete update[i]
      }
    }
    return await TopicModel.findOneAndUpdate({_id: _id}, update, {new: true}).then().catch(e => {
      throw new Error(e)
    })
  },
  async getTopics() {
    return await TopicModel.find({})
  }
}

module.exports = Topic