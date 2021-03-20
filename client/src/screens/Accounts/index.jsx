import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import EditRounded from '@material-ui/icons/EditRounded'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton';
import { TitleRow, CreateUserRow, StyledDelete, StyledTableRow } from './styledComponents'
import MainLayout from '../../components/MainLayout'
import CustomTable from '../../components/CustomTable'
import Modal from '../../components/Modal'
import { SIDEBAR_ROUTES } from '../../constants'
import { createAccount, getAccounts, deleteAccount, updateAccount } from './api'
import { MessageContext } from '../../context/messageContext'
import CreateAccountFormModal from './CreateAccountFormModal'

const Accounts = () => {
  const [state, setState] = useState({
    addAccountModalVisible: false,
    loading: false,
    accounts: [],
    deleteAccountModalVisible: false,
    selectedAccountId: ''
  })
  const { addAccountModalVisible, loading, accounts, deleteAccountModalVisible, selectedAccountId } = state
  const { showSuccessMessage, showErrorMessage } = useContext(MessageContext)

  const history = useHistory()


  const getAccountInfo = () => {
    const userInfo = accounts.find((user => user._id === selectedAccountId))
    return userInfo
  }

  const fetchAccounts = async () => {
    try {
      const response = await getAccounts()
      setState(state => ({ ...state, accounts: response.data, deleteAccountModalVisible: false }))
    } catch (error) {
      console.log(error)
      showErrorMessage(error.data.message)
    }
  }

  const handleCreateAccount = async values => {
    try {
      setState(state => ({ ...state, loading: true }))
      !!selectedAccountId ? await updateAccount(selectedAccountId, values) : await createAccount(values)
      setState(state => ({ ...state, addAccountModalVisible: false, loading: false }))
      const message = !!selectedAccountId ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito'
      showSuccessMessage(message)
      fetchAccounts()
    } catch (error) {
      showErrorMessage(error.data.message)
      setState(state => ({ ...state, loading: false }))
    }
  }

  const handleDeleteAccount = (_evt) => {
    try {
      const response = deleteAccount(selectedAccountId)
      if (response.status === 200) {
        showSuccessMessage('Cuenta eliminada.')
        fetchAccounts()
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const handleCloseModal = _evt => {
    setState(state => ({ ...state, addAccountModalVisible: false }))
  }

  const handleOpenModal = userId => evt => {
    evt.stopPropagation()
    setState(state => ({ ...state, addAccountModalVisible: true, selectedAccountId: userId }))
  }

  const handleOpenDeleteModal = (accountId) => evt => {
    setState(state => ({ ...state, selectedAccountId: accountId, deleteAccountModalVisible: true }))
    evt.stopPropagation()
  }

  const handleCloseDeleteModal = _evt => {
    setState(state => ({ ...state, selectedAccountId: '', deleteAccountModalVisible: false }))
  }

  const gotoTeamMovements = (accountId, name) => evt => {
    console.log(accountId)
    history.push(`/cuentas/${accountId}`, { teamName: name })
    evt.stopPropagation()
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const tableContent = accounts.length ? accounts.map(({ _id, name, userId, client, equipmentId }, index) => (
    <StyledTableRow key={index} onClick={gotoTeamMovements(_id, name)}>
      <TableCell>{name}</TableCell>
      <TableCell>{get(userId, 'name', '')}</TableCell>
      <TableCell>{client}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleOpenModal(_id)}><EditRounded /></IconButton>
        <IconButton onClick={handleOpenDeleteModal(_id)}><StyledDelete /></IconButton>
      </TableCell>
    </StyledTableRow>
  )) : []

  const tableHeaderTitles = ['Nombre Cuenta', 'Responsable de operación', 'Nombre Cliente', '']

  return (
    <MainLayout route={SIDEBAR_ROUTES.ACCOUNTS}>
      <TitleRow>
        <Typography color="primary" variant="h4">Cuentas</Typography>
      </TitleRow>
      <CreateUserRow>
        <Button variant="outlined" color="primary" onClick={handleOpenModal('')}>Crear Cuenta</Button>
      </CreateUserRow>
      <CustomTable headers={tableHeaderTitles} tableContent={tableContent} />
      <CreateAccountFormModal
        open={addAccountModalVisible}
        isEditing={!!selectedAccountId}
        onAccept={handleCreateAccount}
        onCloseModal={handleCloseModal}
        account={getAccountInfo(selectedAccountId)}
        loading={loading}
      />
      < Modal title="Eliminar Cuenta" open={deleteAccountModalVisible} onCancel={handleCloseDeleteModal} onAccept={handleDeleteAccount}>
        <Typography variant="body1">Esta seguro de quere eliminar esta cuenta?</Typography>
      </Modal>
    </MainLayout>
  )
}

export default Accounts