const express = require('express');
const router = express.Router();
const { getUsers, getSingleUser, modifiedUser, addUser, removeSingleUser  } = require('./../models/user')


/* GET user listing. */
router.route('/')
  .get((req, res, next) => {
    const user_list = getUsers()
    res.json(user_list)
  })
  .post((req, res, next) => {
    const user_list = addUser(req)
    res.json(user_list)
  })

router.route('/:id')
  .get((req, res, next) => {
    const user_info = getSingleUser(req.params.id)
    res.json(user_info)
  })
  .patch((req, res, next) => {
    const user_info = modifiedUser(req)
    res.json(user_info)
  })
  .delete((req, res, next) => {
    const delete_result = removeSingleUser(req.params.id)
    res.json(delete_result)
  })

module.exports = router;
