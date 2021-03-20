const express = require('express')
const AccountModel = require('./Account')
const { verifyToken } = require('../auth/authorization')
const router = express.Router()



const getAccounts = async (req, res) => {
  try {
    const accounts = await AccountModel.find().populate('userId')
    if (!accounts)
      console.log(accounts)
    res.status(200).send(accounts)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Ocurrio un error al obtener la información de la cuenta' })
  }
}

const createAccount = async ({ body: accountInfo }, res) => {
  try {
    console.log(accountInfo)
    const account = await AccountModel.create(accountInfo)
    res.status(200).send(account)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error al crear la cuenta' })
  }
}

const deleteAccount = async ({ params: { accountId } }, res) => {
  try {
    const account = await AccountModel.findOneAndDelete({ _id: accountId })
    if (!account) {
      return res.status(404).send({ message: 'No se encontro la cuenta a eliminar' })
    }

    res.status(200).send({ message: 'Ok' })
  } catch (error) {

    res.status(500).send({ message: 'Error al eliminar la cuenta' })
  }
}

const updateAccount = async ({ body: account, params: { accountId } }, res) => {
  try {

    console.log(account)
    const dbAccount = await AccountModel.findOneAndUpdate(
      { _id: accountId },
      {
        name: account.name,
        client: account.client,
        userId: account.userId,
        equipmentId: account.equipmentId
      },
      { new: true }
    )

    res.status(200).send(dbAccount)
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar la información de la cuenta' })
  }
}

router.get('/', verifyToken, getAccounts)
router.post('/', verifyToken, createAccount)
router.delete('/:accountId', verifyToken, deleteAccount)
router.put('/:accountId', verifyToken, updateAccount)

module.exports = {
  router
}