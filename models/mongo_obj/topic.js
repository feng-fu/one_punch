const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  reply: Array
})

const TopicModel = mongoose.model('topic', TopicSchema)
const Topic = {
  async addReply(req) {
    const id = req.params.id
    const { reply } = req.body
    if(!reply) {
      return {
        success: false,
        error: 'not found assign topic.'
      }
    }
    return await TopicModel.findOneAndUpdate({_id:id}, {$push: {reply: reply} }, {new: true})
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
    const { title, content } = req.body
    if(!title || !content ) {
      return {
        success: false,
        msg: 'not provide enough msg.'
      }
    }
    return await TopicModel.create({
      title, content
    }).then().catch()
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