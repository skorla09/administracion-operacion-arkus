require('dotenv').config()
const mongoose = require('mongoose')
const { mongodbUrl } = require('./config/config')

const connectionDb = () => mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = connectionDb
