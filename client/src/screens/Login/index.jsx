import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import { useFormik } from 'formik'
import { Container, FormContainer, StyledTextField, ButtonsRow, StyledImg } from './styledComponents'
import arkusLogo from '../../images/arkusLogo.png'
import { saveUsrToLocal, isUserLoggedIn } from '../../utils/userUtils'
import { MessageContext } from '../../context/messageContext'
import { authenticate } from './api'
// import { values } from 'lodash';

export const Login = () => {
  const history = useHistory()
  const { showErrorMessage } = useContext(MessageContext)
  const handleSubmit = async values => {
    try {
      const response = await authenticate(values.username, values.password)

      if (response.status === 200) {
        saveUsrToLocal(response.data)
        history.push('/')
      }
      else {
        showErrorMessage(response.data.message)
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  if (isUserLoggedIn()) {
    history.push('/')
  }

  const disabledLogin = !formik.values.username || !formik.values.password
  return (
    <Container>
      <StyledImg src={arkusLogo} />
      <h3 data-testid="header">Login</h3>
      <FormContainer>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <StyledTextField
              id="username"
              name="username"
              variant='outlined'
              label="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div>
            <StyledTextField
              id="password"
              name="password"
              variant='outlined'
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
            />
          </div>
          <ButtonsRow>
            <Button type="submit" variant="contained" color="primary" disabled={disabledLogin}>Login</Button>
          </ButtonsRow>
        </form>
      </FormContainer>
    </Container>
  )
}

export default Login