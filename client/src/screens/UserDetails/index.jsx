import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import get from 'lodash/get'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useFormik } from 'formik'
import MainLayout from '../../components/MainLayout'
import { MessageContext } from '../../context/messageContext'
import { getUser, updateUser } from '../Users/api'
import { Content, ActionsRow, StyledForm } from './styledComponents'
import { isAdminUser } from '../../utils/userUtils'

const UserDetails = () => {
  const { userid } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEditing, setisEditing] = useState(false)
  const { showSuccessMessage, showErrorMessage } = useContext(MessageContext)

  const isAdmin = isAdminUser()

  const handleUpdateUser = async values => {
    try {
      if (isEditing) {
        setLoading(true)
        const response = await updateUser(userid, values)
        if (response.status === 200) {
          showSuccessMessage('Usuario actualizado exitosamente')
          setLoading(false)
          setisEditing(false)
        }
      }
    } catch (error) {
      setLoading(false)
      showErrorMessage(error.data.message)
    }
  }



  const validate = values => {
    const errorMessage = 'Requerido'
    const errors = {}
    if (!values.name) {
      errors.name = errorMessage
    }
    if (!values.email) {
      errors.email = errorMessage
      // eslint-disable-next-line
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = errorMessage
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = errorMessage
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Las contraseñas no coinciden'
    }
    if (!values.role) {
      errors.role = errorMessage
    }
    if (!values.englishLevel) {
      errors.englishLevel = errorMessage
    }
    if (!values.knowledge) {
      errors.knowledge = errorMessage
    }
    // eslint-disable-next-line
    if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(values.curriculum)) {
      errors.curriculum = 'URL inválida'
    }
    if (!values.profile) {
      errors.profile = errorMessage
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: get(user, 'name', ''),
      email: get(user, 'email', ''),
      password: get(user, 'password', ''),
      confirmPassword: get(user, 'password', ''),
      role: get(user, 'role', ''),
      englishLevel: get(user, 'englishLevel', ''),
      knowledge: get(user, 'knowledge', ''),
      curriculum: get(user, 'curriculum', ''),
      profile: get(user, 'profile', '')
    },
    enableReinitialize: true,
    validate,
    onSubmit: values => {
      handleUpdateUser(values)
    }
  })

  const fetchUser = async () => {
    try {
      console.log('FETCHING USER')
      const response = await getUser(userid)
      setUser(response.data)
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const enableEditMode = evt => {
    setisEditing(true)
  }

  const disableEditMode = evt => {
    setisEditing(false)
  }

  useEffect(() => { fetchUser() }, [])

  return (
    <MainLayout>
      <Typography variant="h4" color="primary">Detalle Usuario</Typography>
      <Content>
        <div><Avatar /></div>
        {get(user, '_id', false) ?
          <StyledForm onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              color="secondary"
              disabled={!isEditing || !isAdmin}
            />
            <TextField
              fullWidth
              type="password"
              id="password"
              name="password"
              label="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar contraseña"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="role"
              name="role"
              label="Rol"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="profile"
              name="profile"
              label="Perfil"
              value={formik.values.profile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.profile && Boolean(formik.errors.profile)}
              helperText={formik.touched.profile && formik.errors.profile}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="englishLevel"
              name="englishLevel"
              label="Nivel de ingles"
              value={formik.values.englishLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.englishLevel && Boolean(formik.errors.englishLevel)}
              helperText={formik.touched.englishLevel && formik.errors.englishLevel}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="knowledge"
              name="knowledge"
              label="Conocimientos técnicos"
              value={formik.values.knowledge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.knowledge && Boolean(formik.errors.knowledge)}
              helperText={formik.touched.knowledge && formik.errors.knowledge}
              color="secondary"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              id="curriculum"
              name="curriculum"
              label="Link de CV"
              value={formik.values.curriculum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color="secondary"
              disabled={!isEditing}
              error={formik.touched.curriculum && Boolean(formik.errors.curriculum)}
              helperText={formik.touched.curriculum && formik.errors.curriculum}
            />
            <ActionsRow>
              {
                loading ?
                  <CircularProgress /> :
                  <>
                    {isEditing ?
                      <>
                        <Button type="reset" color="secondary" onClick={disableEditMode}>Cancelar</Button>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                        >
                          Guardar
                        </Button>
                      </> : null}
                    {
                      !isEditing ?
                        <Button color="secondary" onClick={enableEditMode}>Editar</Button> : null}
                  </>
              }
            </ActionsRow>
          </StyledForm> : <CircularProgress />}
      </Content>
    </MainLayout>
  )
}

export default UserDetails