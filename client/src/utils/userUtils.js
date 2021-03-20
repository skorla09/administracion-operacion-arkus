import { USER_ROLES } from '../constants'

export const saveUsrToLocal = (usr) => {
  localStorage.setItem('user', JSON.stringify(usr))
}

export const getUserFromLocal = () => {
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

export const removeUserFromLocal = () => {
  localStorage.removeItem('user')
}

export const isUserLoggedIn = () => {
  let isLoggednIn = false
  const user = getUserFromLocal()
  if (user && user.token) {
    isLoggednIn = true
  }
  return isLoggednIn
}

export const isAdminUser = () => {
  const user = getUserFromLocal()
  return user && user.user.role === (USER_ROLES.SUPER || USER_ROLES.ADMIN)
}