const express = require('express')
const router = express.Router()
// const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/memo/topic')
// const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/mongo/topic')

// const Topic  = require('./../models/mongo_obj/topic')

const { getTopics, getSingleTopic, modifiedTopic, addTopic, removeSingleTopic, addReply  } = require('./../models/mongo_obj/topic')

const permissionVerify = require('../middleware/login_state')

/* GET user listing. */
router.route('/')
  .get(permissionVerify(), (req, res, next) => {
    
    (async () => {
      await getTopics().then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .post((req, res, next) => {

    (async () => {
      await addTopic(req).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
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
  .delete((req, res, next) => {
    (async () => {
      await removeSingleTopic(req.params.id).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })

router.route('/:id/reply')
  .post((req, res, next) => {
    (async () => {
      await addReply(req).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })

module.exports = router
