import React, { useEffect, useContext, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import moment from 'moment'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import MainLayout from '../../components/MainLayout'
import DeleteRounded from '@material-ui/icons/DeleteRounded'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MessageContext } from '../../context/messageContext'
import { SIDEBAR_ROUTES } from '../../constants'
import CustomTable from '../../components/CustomTable'
import Modal from '../../components/Modal'
import AddUserModal from './AddUserForm';
import { TitleRow, CreateUserRow } from './styledComponents'
import { getTeamMembers, updateDate, addTeamMember, removeTeamMember } from './api'

const TeamControl = () => {
  const [movements, setMovements] = useState([])
  const [teamMatesModalVisible, setTeamMatesModalVisible] = useState(false)
  const [userToDelete, setUserToDelete] = useState('')
  const [removeMemberModalVisible, setRemoveModalVisible] = useState(false)
  const { showSuccessMessage, showErrorMessage } = useContext(MessageContext)
  const { accountId } = useParams()
  const location = useLocation()

  const fetchTeamMovements = async () => {
    try {
      const response = await getTeamMembers(accountId)
      if (response.status === 200) {
        setMovements(response.data)
      } else {
        showErrorMessage('Error al obtener integrantes del equipo')
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const handleOpenModal = evt => {
    setTeamMatesModalVisible(true)
  }
  const handleCloseModal = evt => {
    setTeamMatesModalVisible(false)
  }

  const saveChangeDate = async (dateInfo) => {
    try {
      const response = await updateDate(accountId, dateInfo)
      if (response.status === 200) {
        showSuccessMessage('Fecha actualizada')
        fetchTeamMovements()
      } else {
        showErrorMessage('Error al actualizar la fecha')
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }
  const handleChangeDate = (userId, date, dateType) => {
    const dateObj = {
      userId,
      date,
      dateType
    }
    saveChangeDate(dateObj)
  }

  const handleAddTeamMember = async (memberData) => {
    try {
      const response = await addTeamMember(memberData)
      if (response.status !== 200) {
        showErrorMessage('Error al dar de alta integrante')
      }
      handleCloseModal()
      fetchTeamMovements()
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const handleOpenDeleteModal = (movementId) => evt => {
    setRemoveModalVisible(true)
    setUserToDelete(movementId)
  }

  const handleCloseDeleteModal = evt => {
    setRemoveModalVisible(false)
  }

  const handleRemoveMember = async evt => {
    try {
      const response = await removeTeamMember(userToDelete)
      if (response.status === 200) {
        showSuccessMessage('Usuario dado de baja del equipo')
        setRemoveModalVisible(false)
        fetchTeamMovements()
      } else {
        showErrorMessage('Error al elimiar usuario del equipo')
      }
    } catch (error) {
      showErrorMessage('Error al remover integrante del equipo')
    }
  }

  React.useEffect(() => fetchTeamMovements(), [])

  const tableContent = movements.length ? movements.map((movement, index) => {
    return (
      <TableRow key={index}>
        <TableCell>{movement.userId.name || ''}</TableCell>
        <TableCell>
          <KeyboardDatePicker
            name="startDate"
            autoOk={true}
            variant="inline"
            value={movement.startDate}
            format="DD/MM/YYYY"
            onChange={(date) => handleChangeDate(movement.userId._id, date, 'start')}
            minDate={movement.startDate}
            disableToolbar={true}
          />
        </TableCell>
        <TableCell>
          <KeyboardDatePicker
            name="endDate"
            autoOk={true}
            variant="inline"
            value={movement.endDate}
            format="DD/MM/YYYY"
            onChange={(date) => handleChangeDate(movement.userId._id, date, 'end')}
            minDate={movement.startDate}
            disableToolbar={true}
          />
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenDeleteModal(movement._id)}><DeleteRounded /></IconButton>
        </TableCell>
      </TableRow>)
  }) : []

  const tableHeaderTitles = ['Nombre', 'Fecha Inicio', 'Fecha Fin', '']
  return (
    <MainLayout route={SIDEBAR_ROUTES.CONTROL}>
      <TitleRow>
        <Typography color="primary" variant="h4">{get(location, 'state.teamName')}</Typography>
      </TitleRow>
      <CreateUserRow>
        <Button variant="outlined" color="primary" onClick={handleOpenModal}>Agregar Integrante</Button>
      </CreateUserRow>

      <Typography variant="h5" color="primary">Miembros del equipo</Typography>
      <CustomTable headers={tableHeaderTitles} tableContent={tableContent} />
      <AddUserModal open={teamMatesModalVisible} onClose={handleCloseModal} onAccept={handleAddTeamMember}></AddUserModal>

      < Modal title="Remover Integrante del equipo" open={removeMemberModalVisible} onCancel={handleCloseDeleteModal} onAccept={handleRemoveMember}>
        <Typography variant="body1">¿Remover integrante del equipo?</Typography>
      </Modal>
    </MainLayout>
  )
}

export default TeamControl
