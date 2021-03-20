import API from '../../Api/api'
const loginUrl = 'authentication'


export const authenticate = (username, password) => {
  return API.post(`/${loginUrl}/login`, {
    email: username, password
  })
}