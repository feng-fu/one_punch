const express = require('express')
const router = express.Router()
// const { getUsers, getSingleUser, modifiedUser, addUser, removeSingleUser  } = require('./../models/memo/user')

// const { addUser,getUsers, findSpecialUser, modifiedUser, removeSingleUser } = require('./../models/mongo/user')
const { addUser,getUsers, findSpecialUser, modifiedUser, removeSingleUser } = require('./../models/mongo_obj/user')

/* GET user listing. */
router.route('/')
  .get((req, res, next) => {

    (async () => {
      await getUsers().then(r => {
        res.json(r)
      }).catch(e => {
        // throw new Error(e.message)
        next(e.message)
      })
    })()
  })
  .post((req, res, next) => {
    (async () => {
      await addUser(req).then(r => {
        res.json(r)
      }).catch(e => {
        // throw new Error('add error')
        next(e)
      })
    })()
  })

router.route('/:id')
  .get((req, res, next) => {
    (async () => {
      await findSpecialUser(req.params.id).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .patch((req, res, next) => {
    (async () => {
      await modifiedUser(req).then(r => {
        res.json(r)
      }).catch(e => {
        next(e.message)
      })
    })()
  })
  .delete((req, res, next) => {
    (async () => {
      await removeSingleUser(req.params.id).then(r => {
        res.json(r)
      }).catch(e => {
        next(e)
      })
    })()
  })

module.exports = router
