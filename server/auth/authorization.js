const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { refreshToken } = require('../auth/authentication')

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const refreshTokenCookie = req.cookies['refreshToken']
    const token = authHeader && authHeader.split(' ').pop()
    if (!refreshTokenCookie) {
      return res.status(403).send({ error: 'invalid_grant' })
    }
    const verified = jwt.verify(token, 'secretsecretsecret')
    if (!verified) {
      return res.status(401).send({ message: 'Error: Unauthorized user.' })
    } else {
      next()
    }
  } catch (error) {
    try {
      const refreshTokenCookie = req.cookies['refreshToken']
      const response = await refreshToken(refreshTokenCookie)
      res.status(203).send(response)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

module.exports = {
  verifyToken
}