const express = require('express');
const router = express.Router();
const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/topic')


/* GET user listing. */
router.route('/')
  .get((req, res, next) => {
    const topic_list = getTopics()
    res.json(topic_list)
  })
  .post((req, res, next) => {
    const topic_list = addTopic(req)
    res.json(topic_list)
  })

router.route('/:id')
  .get((req, res, next) => {
    const topic_info = getSingleTopic(req.params.id)
    res.json(topic_info)
  })
  .patch((req, res, next) => {
    const topic_info = modifiedTopic(req)
    res.json(topic_info)
  })
  .delete((req, res, next) => {
    const delete_result = removeSingleTopic(req.params.id)
    res.json(delete_result)
  })

router.route('/:id/reply')
  .post((req, res, next) => {
    const result = addReply(req)
    res.json(result)
  })

module.exports = router;
