require('dotenv').config
const db = require('./db')
const app = require('./app')
const { port } = require('./config/config')

app.listen(port, () => {
  try {
    db()
    console.log(`Server running on port ${port}`)
  } catch (error) {
    console.log('Error connecting to DB')
  }
})