import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import EditOutlineRounded from '@material-ui/icons/EditRounded'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton';
import { TitleRow, CreateUserRow, StyledDelete, StyledTableRow } from './styledComponents'
import MainLayout from '../../components/MainLayout'
import CustomTable from '../../components/CustomTable'
import Modal from '../../components/Modal'
import { SIDEBAR_ROUTES } from '../../constants'
import { createUser, getUsers, deleteUser, updateUser } from './api'
import { MessageContext } from '../../context/messageContext'
import CreateUserModalForm from './CreateUserForm'

const Users = () => {
  const [state, setState] = useState({
    addUserModalVisible: false,
    loading: false,
    users: [],
    deleteUsrModalVisible: false,
    selectedUserId: ''
  })
  const { addUserModalVisible, loading, users, deleteUsrModalVisible, selectedUserId } = state
  const { showSuccessMessage, showErrorMessage } = useContext(MessageContext)
  const history = useHistory()

  const getUserInfo = () => {
    const userInfo = users.find((user => user._id === selectedUserId))
    return userInfo
  }

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setState(state => ({ ...state, users: response.data, deleteUsrModalVisible: false }))
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const handleCreateUser = async values => {
    try {
      setState(state => ({ ...state, loading: true }))
      const response = !!selectedUserId ? await updateUser(selectedUserId, values) : await createUser(values)
      if (response.status === 200) {
        setState(state => ({ ...state, addUserModalVisible: false, loading: false }))
        fetchUsers()
      } else {
        showErrorMessage(response.data.message)
      }
    } catch (error) {
      showErrorMessage(error.data.message)
      setState(state => ({ ...state, loading: false }))
    }
  }

  const handleDeleteUSer = (_evt) => {
    try {
      const response = deleteUser(selectedUserId)
      if (response.status === 200) {
        showSuccessMessage('Usuario eliminado.')
        fetchUsers()
      } else {
        showErrorMessage(response.data.message)
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const handleCloseModal = _evt => {
    setState(state => ({ ...state, addUserModalVisible: false }))
  }

  const handleOpenModal = userId => evt => {
    evt.stopPropagation()
    setState(state => ({ ...state, addUserModalVisible: true, selectedUserId: userId }))
  }

  const handleOpenDeleteModal = (userId) => evt => {
    setState(state => ({ ...state, selectedUserId: userId, deleteUsrModalVisible: true }))
    evt.stopPropagation()
  }

  const handleCloseDeleteModal = _evt => {
    setState(state => ({ ...state, selectedUserId: '', deleteUsrModalVisible: false }))
  }

  const handleGoToDetails = (userId) => _evt => {
    history.push(`/usuarios/${userId}`)
  }

  useEffect(() => { fetchUsers() }, [])

  const tableContent = users.length ? users.map(({ _id, name, email, role }, index) => (
    <StyledTableRow key={index} onClick={handleGoToDetails(_id)}>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleOpenModal(_id)}><EditOutlineRounded /></IconButton>
        <IconButton onClick={handleOpenDeleteModal(_id)}><StyledDelete /></IconButton>
      </TableCell>
    </StyledTableRow>
  )) : []

  const tableHeaderTitles = ['Nombre', 'Correo', 'Rol', '']

  return (
    <MainLayout route={SIDEBAR_ROUTES.USERS}>
      <TitleRow>
        <Typography color="primary" variant="h4">Usuarios</Typography>
      </TitleRow>
      <CreateUserRow>
        <Button variant="outlined" color="primary" onClick={handleOpenModal('')}>Crear Usuario</Button>
      </CreateUserRow>
      <CustomTable headers={tableHeaderTitles} tableContent={tableContent} />
      <CreateUserModalForm
        open={addUserModalVisible}
        onAccept={handleCreateUser}
        onCloseModal={handleCloseModal}
        user={getUserInfo(selectedUserId)}
        loading={loading}
        isEditing={selectedUserId}
      />
      < Modal title="Eliminar Usuario" open={deleteUsrModalVisible} onCancel={handleCloseDeleteModal} onAccept={handleDeleteUSer}>
        <Typography variant="body1">Esta seguro que desea eliminar este usuario?</Typography>
      </Modal>
    </MainLayout>
  )
}

export default Users