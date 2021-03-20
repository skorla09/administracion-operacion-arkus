require('dotenv').config
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerExpress = require('swagger-ui-express')
const { dashboardUrl } = require('./config/config')
// options to use swagger with json files
const swaggerOptions = require('./swaggerConfig')
// to load yaml file to use swagger with .yaml especification
const YAML = require('yamljs')
const yamlfile = YAML.load('./public/swagger.yaml')

const usersController = require('./users/userController').router
const authentication = require('./auth/authentication').router
const accountsController = require('./account/accountController').router
const movementsController = require('./movements/movementController').router


const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: dashboardUrl
}))
app.use(express.static('public'))
app.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(yamlfile))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/authentication', authentication)
app.use('/users', usersController)
app.use('/accounts', accountsController)
app.use('/team-movements', movementsController)

module.exports = app