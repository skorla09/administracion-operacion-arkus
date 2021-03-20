const mongoose = require('mongoose')

const MovementModel = new mongoose.Schema({
  accountId: { type: String, ref: 'Account' },
  userId: { type: String, ref: 'User' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  active: { type: Boolean }
})

module.exports = mongoose.model('Movement', MovementModel)
