const express = require('express');
const router = express.Router();
// const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/memo/topic')
const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/mongo/topic')


/* GET user listing. */
router.route('/')
  .get(async (req, res, next) => {
    const topic_list = await getTopics()
    res.json(topic_list)
  })
  .post(async (req, res, next) => {
    const topic_list = await addTopic(req)
    res.json(topic_list)
  })

router.route('/:id')
  .get(async (req, res, next) => {
    const topic_info = await getSingleTopic(req.params.id)
    res.json(topic_info)
  })
  .patch(async (req, res, next) => {
    const topic_info = await modifiedTopic(req)
    res.json(topic_info)
  })
  .delete(async (req, res, next) => {
    const delete_result = await removeSingleTopic(req.params.id)
    res.json(delete_result)
  })

router.route('/:id/reply')
  .post(async (req, res, next) => {
    const result = await addReply(req)
    res.json(result)
  })

module.exports = router;
