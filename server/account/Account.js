const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  name: { type: String },
  userId: { type: String, ref: 'User' },
  client: { type: String },
})

module.exports = mongoose.model('Account', AccountSchema)