const express = require('express')
const router = express.Router()
// const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/memo/topic')
// const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/mongo/topic')

// const Topic  = require('./../models/mongo_obj/topic')

const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/mongo_obj/topic')

const permissionVerify = require('../middleware/login_state')

/* GET user listing. */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      await getTopics().then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .post(permissionVerify(), (req, res, next) => {
    (async () => {
      return await addTopic(req)
    })().then(r => {
        res.json(r)
      }).catch(e => {
        next(e)
      })
  })

router.route('/:id')
  .get((req, res, next) => {
    (async () => {
      await getSingleTopic(req.params.id).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .patch((req, res, next) => {
    (async () => {
      await modifiedTopic(req).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .delete(permissionVerify(), (req, res, next) => {
    (async () => {
      await removeSingleTopic(req.params.id).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })

router.route('/:id/reply')
  .post(permissionVerify(), (req, res, next) => {
    (async () => {
      return await addReply(req)
    })().then(r => {
        res.json(r)
      }).catch(e => {
        next(e)
      })
  })

module.exports = router
