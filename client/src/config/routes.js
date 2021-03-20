import Login from '../screens/Login'
import Home from '../screens/Home'
import Users from '../screens/Users'
import Movements from '../screens/Movements'
import TeamControl from '../screens/TeamControl'
import Accounts from '../screens/Accounts'
import UserDetails from '../screens/UserDetails'

export const routes = [
  {
    path: '/usuarios/:userid',
    component: UserDetails
  },
  {
    path: '/usuarios',
    component: Users
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/movimientos',
    component: Movements
  },
  {
    path: '/cuentas/:accountId',
    component: TeamControl
  },
  {
    path: '/cuentas',
    component: Accounts
  },
  {
    path: '/',
    component: Home
  }
]
