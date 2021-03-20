import React/*, { useEffect }*/ from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { isUserLoggedIn, /*getUserFromLocal, removeUserFromLocal */ } from '../../utils/userUtils'
import MainLayout from '../../components/MainLayout'
// import API from '../../Api/api'
import { TitleRow, Content } from './styledComponents'
import arkusLogo from '../../images/arkusLogo.png'

export const Home = () => {
  const history = useHistory()
  const isLoggedIn = isUserLoggedIn()

  if (!isLoggedIn) {
    history.push('/login')
  }

  return (
    <MainLayout>
      <TitleRow>
        <Typography variant="h4" color="primary">Administración de Operación</Typography>
      </TitleRow>
      <Content>
        <img src={arkusLogo} alt="logo" />
      </Content>
    </MainLayout>
  )
}

export default Home