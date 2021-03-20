const router = require('express').Router()
const UserModel = require('./User')
const bcrypt = require('bcrypt')
const { verifyToken } = require('../auth/authorization')

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: { $ne: 'super' } })
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ message: 'Error obteniendo los usuarios' })
  }
}

const getUser = async ({ params: { userId } }, res) => {
  try {
    const user = await UserModel.findById(userId).lean()
    if (!user) {
      return res.status(500).send({ message: 'Usuario no encontrado' })
    }

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener usuario' })
  }
}

const createUser = async ({ body: { user } }, res) => {
  try {
    const userFound = await UserModel.findOne({ email: user.email })
    if (!!userFound) {
      return res.status(409).send({ message: 'Correo ya usado.' })
    }
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    const newUser = new UserModel({
      name: user.name.toLowerCase(),
      email: user.email.toLowerCase(),
      password: hashedPassword,
      role: user.role.toLowerCase(),
      englishLevel: user.englishLevel.toLowerCase(),
      knowledge: user.knowledge.toLowerCase(),
      curriculum: user.curriculum.toLowerCase()
    })

    const saved = await newUser.save()
    res.status(200).send(saved)
  } catch (error) {
    res.status(500).send({ message: 'Error al crear usuario' })
  }
}

const deleteUser = async ({ params: { userId } }, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: userId })
    res.status(200).send({ msg: 'Eliminado' })
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el usuario, por favor intente mas tarde' })
  }
}

const updateUser = async ({ body: { user }, params: { userId } }, res) => {
  try {
    const dbUser = await UserModel.findById(userId)
    if (!dbUser) {
      return res.status(404).send({ message: 'User not found' })
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10)
    dbUser.name = user.name.toLowerCase()
    dbUser.email = user.email.toLowerCase()
    dbUser.password = hashedPassword
    dbUser.role = user.role.toLowerCase()
    dbUser.englishLevel = user.englishLevel.toLowerCase()
    dbUser.knowledge = user.knowledge.toLowerCase()
    dbUser.curriculum = user.curriculum.toLowerCase()

    await dbUser.save()
    res.status(200).send(dbUser)
  } catch (error) {
    res.status(500).send({ message: 'Ocurrio un error al actualizar el usuario' })
  }
}

router.get('/', verifyToken, getUsers)
router.get('/:userId', verifyToken, getUser)
router.post('/create', verifyToken, createUser)
router.put('/:userId', verifyToken, updateUser)
router.delete('/:userId', verifyToken, deleteUser)

module.exports = { router }