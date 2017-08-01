const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  reply: Array
})

const TopicModel = mongoose.model('topic', TopicSchema)


async function getTopics() {
  return await TopicModel.find({})
}

async function modifiedTopic(req) {
  const _id = req.params.id
  const { title, content } = req.body
  return await TopicModel.findOneAndUpdate({_id: _id}, {title, content}).then().catch(e => {
    throw new Error(e)
  })
}

async function addTopic(req) {
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
}

async function getSingleTopic(topic_id) {
  return await TopicModel.findOne({_id: topic_id})
}

async function removeSingleTopic(topic_id) {
  return await TopicModel.findOneAndRemove({_id: topic_id}).then().catch(e => {
    throw new Error(e)
  })
}

async function addReply(req) {
  const id = req.params.id
  const { reply } = req.body
  if(!reply) {
    return {
      success: false,
      error: 'not found assign topic.'
    }
  }
  return await TopicModel.findOneAndUpdate({_id:id}, {$push: {reply: reply} })
}

module.exports = {
  getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply
}