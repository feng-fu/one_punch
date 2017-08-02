const mongoose = require('mongoose')

const uri = 'mongodb://localhost/node'

mongoose.connect(uri, {useMongoClient: true})

mongoose.Promise = global.Promise