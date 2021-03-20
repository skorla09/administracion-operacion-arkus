import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useFormik } from 'formik'
import Modal from '../../../components/Modal'
import { StyledForm, ActionsRow } from './styledComponent'

const UserModalForm = ({
  open,
  user,
  loading,
  onCloseModal = () => { },
  onAccept = () => { },
  isEditing = false
}) => {

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
      errors.email = 'Dirección de correo no válida';
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
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      role: user.role,
      englishLevel: user.englishLevel,
      knowledge: user.knowledge,
      curriculum: user.curriculum,
      profile: user.profile
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

  const modalTitle = isEditing ? 'Editar Usuario' : 'Crear Usuario'
  return (
    <Modal title={modalTitle} open={open} withCustomActions>
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre completo"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          color="secondary"
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
        />
        <TextField
          fullWidth
          id="curriculum"
          name="curriculum"
          label="Link de CV"
          value={formik.values.curriculum}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.curriculum && Boolean(formik.errors.curriculum)}
          helperText={formik.touched.curriculum && formik.errors.curriculum}
          color="secondary"
        />

        <ActionsRow>
          {loading ? <CircularProgress /> :
            <><Button color="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button type="submit" color="primary" variant="outlined" >Aceptar</Button></>}
        </ActionsRow>
      </StyledForm>
    </Modal>
  )
}

UserModalForm.defaultProps = {
  user: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    englishLevel: '',
    knowledge: '',
    curriculum: ''
  }
}
export default UserModalForm