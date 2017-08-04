const user_list = []
let USER_ID = 10000

function getUsers() {
  return {
    success: true,
    user_list
  }
}

function modifiedUser(req) {
  const user_id = req.params.id
  const { username, age, gender } = req.body
  let user = user_list.find(user=> user.id == user_id)
  if(user === undefined) {
    return {
      success: false,
      error: 'not found specifed user, please check it and try again.'
    }
  }
  if(username) user.username = username
  if(age) user.age = age
  if(gender) user.gender = gender
  return {
    success: true,
    user
  }
}

function addUser(req) {
  const { username, age, gender } = req.body
  if(!username || !age || !gender) {
    return {
      success: false,
      error: 'not provide enough message.'
    }
  }
  const user = {
    username,
    age,
    gender,
    id: USER_ID++
  }
  user_list.push(user)
  return {
    success: true,
    user_list
  }
}

function getSingleUser(user_id) {
  // console.log(user_id)
  const user = user_list.find(user => user.id == user_id)
  if(user) {
    return {
      success: true,
      user
    }
  } else {
    return {
      success: false,
      error: 'not find specified user.'
    }
  }
}

function removeSingleUser(user_id) {
  let index = -1
  for(let i in user_list) {
    let user = user_list[i]
    if(user.id == user_id) {
      index = i
      break
    }
  }
  if(index > -1) {
    user_list.splice(index, 1)
    return {
      success: true,
      msg: 'remove user success...'
    }
  } else {
    return {
      success: false,
      msg: 'user is nonentity...'
    }
  }
}

module.exports = {
  getUsers,
  modifiedUser,
  addUser,
  getSingleUser,
  removeSingleUser
}
