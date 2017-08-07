const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uri = 'mongodb://localhost/cnode'

mongoose.connect(uri, {useMongoClient: true})


const db  = mongoose.connection

// global.Promise = require('bluebird')

mongoose.Promise  = global.Promise

db.on('error', console.error.bind(console, 'connect error.'))

db.once('open', () => {
  console.log('opened')
})