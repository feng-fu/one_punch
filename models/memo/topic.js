const topic_list = []
let TOPIC_ID = 10000

function getTopics() {
  return {
    success: true,
    topic_list
  }
}

function modifiedTopic(req) {
  const topic_id = req.params.id
  const { title, user_id, content } = req.body
  let topic = topic_list.find(topic=> topic.id == topic_id)
  if(topic === undefined) {
    return {
      success: false,
      error: 'not found specifed topic, please check it and try again.'
    }
  }
  if(title) topic.title = title
  if(user_id) topic.user_id = user_id
  if(content && content.length > 5) topic.content = content
  return {
    success: true,
    topic
  }
}

function addTopic(req) {
  const { title, user_id, content } = req.body
  if(!title || !user_id || !content) {
    return {
      success: false,
      error: 'not provide enough message.'
    }
  }
  const topic = {
    title,
    user_id, 
    content,
    reply: [],
    id: TOPIC_ID++
  }
  topic_list.push(topic)
  return {
    success: true,
    topic_list
  }
}

function getSingleTopic(topic_id) {
//   console.log(topic_id)
  const topic = topic_list.find(topic => topic.id == topic_id)
  if(topic) {
    return {
      success: true,
      topic
    }
  } else {
    return {
      success: false,
      error: 'not find specified topic.'
    }
  }
}

function removeSingleTopic(topic_id) {
  let index = -1
  for(let i in topic_list) {
    let topic = topic_list[i]
    if(topic.id == topic_id) {
      index = i
      break
    }
  }
  if(index > -1) {
    topic_list.splice(index, 1)
    return {
      success: true,
      msg: 'remove topic success...'
    }
  } else {
    return {
      success: false,
      msg: 'topic is nonentity...'
    }
  }
}

function addReply(req) {
  const id = req.params.id
  const topic = topic_list.find(topic => topic.id == id)
  if(!topic) {
    return {
      success: false,
      error: 'not found assign topic.'
    }
  }
  const { user_id, content } = req.body
  if(!user_id || !content) {
    return {
      success: false,
      error: 'please provide enough msg.'
    }
  }
  topic.reply.push({
    user_id: user_id,
    content: content
  })
  
  return {
    success: true,
    topic
  }
}

module.exports = {
  getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply
}