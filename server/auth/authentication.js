const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const UserModel = require('../users/User')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    console.log(user.password)
    const isValidPassword = bcrypt.compareSync(password, user.password)
    console.log(isValidPassword)
    if (!user || !isValidPassword) {
      return res.status(404).send({ message: 'Username o Password incorrecto' })
    }

    const token = jwt.sign({ userId: user._id }, 'secretsecretsecret', { expiresIn: '5m' })
    const refreshToken = jwt.sign({ userId: user._id }, 'secretsecretsecret', { expiresIn: '12h' })
    const cookieConfig = {
      httpOnly: true,
      maxAge: 1000000,
    }
    res.cookie('refreshToken', refreshToken, cookieConfig)

    res.status(200).send({ user, token })
  } catch (error) {
    res.status(500).send({ message: 'Ha ocurrido un error. Intente de nuevo' })
  }
}

const refreshToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      return { error: 'invalid_grant' }
    }

    const { userId } = jwt.verify(refreshToken, 'secretsecretsecret')
    const user = await UserModel.findById(userId).select('_id name role email')
    const token = jwt.sign({ userId: user._id }, 'secretsecretsecret', { expiresIn: '2m' })
    return { user, token }

  } catch (error) {
    throw error
  }
}

const logout = async (req, res) => {
  try {
    res.removeHeader('authorization')
    res.clearCookie('refreshToken')
    res.status(200).send({ loggedOut: true })
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' })
  }
}

router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)

module.exports = {
  router,
  refreshToken
}