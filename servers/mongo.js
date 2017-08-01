const mongoose = require('mongoose')

const uri = 'mongodb://localhost/node'

mongoose.connect(uri)

mongoose.Promise = global.Promise