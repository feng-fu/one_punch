const express = require('express');
const router = express.Router();
// const { getUsers, getSingleUser, modifiedUser, addUser, removeSingleUser  } = require('./../models/memo/user')

const { addUser,getUsers, findSpecialUser, modifiedUser, removeSingleUser } = require('./../models/mongo/user')

/* GET user listing. */
router.route('/')
  .get(async (req, res, next) => {
    const user_list = await getUsers()
    res.json(user_list)
  })
  .post(async (req, res, next) => {
    const user_list = await addUser(req)
    res.json(user_list)
  })

router.route('/:id')
  .get(async (req, res, next) => {
    const user_info = await findSpecialUser(req.params.id)
    res.json(user_info)
  })
  .patch(async (req, res, next) => {
    const user_info = await modifiedUser(req)
    res.json(user_info)
  })
  .delete(async (req, res, next) => {
    const delete_result = await removeSingleUser(req.params.id)
    res.json(delete_result)
  })

module.exports = router;
