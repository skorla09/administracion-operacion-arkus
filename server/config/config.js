

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  dashboardUrl: process.env.DASHBOARD_URL
}