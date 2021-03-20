const express = require('express')
const router = express.Router()
const MovementModel = require('./Movement')
const { verifyToken } = require('../auth/authorization')


const getTeamMovements = async ({ params: { teamId } }, res) => {
  try {
    // console.log('GET TEAM MOVEMENTS')
    // console.log(teamId)
    const movements = await MovementModel.find({ accountId: teamId, active: true }).populate('userId accountId')
    // console.log('GET MOVEMENTS')
    // console.log(movements)
    res.status(200).send(movements)
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener movimientos' })
  }
}

const addUserMovement = async ({ body: movementInfo }, res) => {
  try {
    const newMovement = new MovementModel({
      accountId: movementInfo.accountId,
      userId: movementInfo.userId,
      startDate: new Date(movementInfo.startDate),
      endDate: new Date(movementInfo.endDate),
      active: true
    })

    const saved = await newMovement.save()
    if (!saved) {
      return res.status(400).send({ message: 'Error al guardar un movimiento' })
    }
    res.status(200).send(saved)
  } catch (error) {
    res.status(500).send({ message: 'Error al crear equipo' })
  }
}

const updateMovementDate = async ({ body, params }, res) => {
  try {
    const { dateType, date, userId } = body
    const movement = await MovementModel.findOneAndUpdate({ accountId: params.teamId, userId: userId },
      {
        [`${dateType}Date`]: new Date(date)
      })
    res.status(200).send({ message: 'OK' })
  } catch (error) {
    res.status(500).send({ message: 'Ocurrio un error al actualizar la fecha' })
  }
}

const removeTeamMember = async ({ params: { movementId } }, res) => {
  try {
    const movement = await MovementModel.findById(movementId)
    movement.active = false
    await movement.save()
    res.status(200).send({ message: 'OK' })
  } catch (error) {
    res.status(500).send({ message: 'Ocurrio un error al eliminar al miembro del equipo' })
  }
}

router.post('/add-user', verifyToken, addUserMovement)
router.get('/:teamId', verifyToken, getTeamMovements)
router.put('/update-date/:teamId', verifyToken, updateMovementDate)

router.delete('/remove-user/:movementId', verifyToken, removeTeamMember)

module.exports = {
  router
}
