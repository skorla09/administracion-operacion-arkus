import React, { useEffect, useContext, useState } from 'react'
import includes from 'lodash/includes'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useFormik } from 'formik'
import Modal from '../../../components/Modal'
import { MessageContext } from '../../../context/messageContext'
import { getUsers } from '../../Users/api'
import { StyledForm, ActionsRow, StyledFormControl } from './styledComponents'

const AccountModalForm = (
  {
    open,
    account,
    loading,
    isEditing = false,
    onCloseModal = () => { },
    onAccept = () => { }
  }
) => {
  const { showErrorMessage } = useContext(MessageContext)
  const [users, setUsers] = useState([])
  // const [selectedUser, setSelectedUSer] = useState('')

  const validate = values => {
    const errorMessage = 'Requerido'
    const errors = {}
    if (!values.name) {
      errors.name = errorMessage
    }
    if (!values.userId) {
      errors.userId = errorMessage
    }
    if (!values.client) {
      errors.client = errorMessage
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: account.name,
      userId: account.userId._id || '',
      client: account.client,
    },
    enableReinitialize: true,
    validate,
    onSubmit: values => {
      onAccept(values)
    }
  })

  const handleCloseModal = evt => {
    formik.resetForm()
    onCloseModal()
  }

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setUsers(response.data)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const selectOptions = users.length ? users.map((user, index) => (
    <MenuItem key={`${index}_${user._id}`} value={user._id}>{user.name}</MenuItem>
  )) : []

  useEffect(() => fetchUsers(), [])

  const modalTitle = isEditing ? 'Editar' : 'Crear'
  return (
    <Modal title={`${modalTitle} Cuenta`} open={open} withCustomActions>
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre de la cuenta"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          color="secondary"
        />
        <StyledFormControl
          error={formik.touched.userId && Boolean(formik.errors.userId)}
        >
          <InputLabel color="secondary">Responsable de operación</InputLabel>
          <Select
            id="userId"
            name="userId"
            value={formik.values.userId}
            onChange={formik.handleChange}
            color="secondary"
          >
            {selectOptions}
          </Select>
          <FormHelperText>{formik.touched.userId && formik.errors.userId}</FormHelperText>
        </StyledFormControl>
        <TextField
          fullWidth
          id="client"
          name="client"
          label="Nombre del cliente"
          value={formik.values.client}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.client && Boolean(formik.errors.client)}
          helperText={formik.touched.client && formik.errors.client}
          color="secondary"
        />
        {/* <TextField
          fullWidth
          id="equipmentId"
          name="equipmentId"
          label="Equipo Id"
          value={formik.values.equipmentId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.equipmentId && Boolean(formik.errors.equipmentId)}
          helperText={formik.touched.equipmentId && formik.errors.equipmentId}
          color="secondary"
        /> */}
        <ActionsRow>
          {loading ? <CircularProgress /> :
            <><Button color="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button type="submit" color="primary" variant="outlined" >Aceptar</Button></>}
        </ActionsRow>
      </StyledForm>
    </Modal>
  )
}

AccountModalForm.defaultProps = {
  account: {
    name: '',
    userId: '',
    operationResponsible: '',
    equipmentId: '',
  }
}
export default AccountModalForm