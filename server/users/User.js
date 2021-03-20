const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  englishLevel: { type: String },
  knowledge: { type: String },
  curriculum: { type: String },
  profile: { type: String }
})

module.exports = mongoose.model('User', UserSchema)