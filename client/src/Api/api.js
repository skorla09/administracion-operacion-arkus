import axios from 'axios'
import get from 'lodash/get'
import config from '../config/config'
import { getUserFromLocal, removeUserFromLocal, saveUsrToLocal } from '../utils/userUtils'
// const URL = 'http://localhost:3001'
const BASE_URL = 'http://localhost:3000'

console.log('CONFIIIIIIIG')
console.log(config)
axios.defaults.withCredentials = true
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  // withCredentials: true,
})

axiosInstance.interceptors.request.use(
  request => {
    const user = getUserFromLocal()
    if (!request.url.includes('login')) {
      request.headers['Authorization'] = `Bearer ${user && user.token}`
    }
    return Promise.resolve(request)

  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(response => {
  console.log('INTERCEPTOR RESPONSE')
  console.log(response)
  const token = get(response, 'data.token', false)
  console.log(token)
  if (token) {
    saveUsrToLocal(response.data)
    window.location.reload()
  }
  return Promise.resolve(response)
}, async (error) => {
  // try {
  // console.log('RESPONSE INTERCEPTOR ERROR')
  // console.log(error.response)
  // return Promise.reject(error.response)
  // let customError = error.response
  // let resp
  // if (error.response.status === 401 && error.response.data.jwtExpired) {
  //   // resp = await axiosInstance.post('/authentication/refresh-token', {})
  //   // console.log('401 RESPONSE ===')
  //   // console.log(resp.data)
  //   // saveUsrToLocal(resp.data)
  //   window.location.reload()
  //   return
  // }
  if (error.response.status === 403 && error.response.data.error === 'invalid_grant') {
    await axiosInstance.post('/authentication/logout', {})
    // console.log('403 RESPONSE')
    // console.log(resp)
    removeUserFromLocal()
    window.location.href = BASE_URL
    return
  }
  return Promise.reject(error.response)
  // } catch (err) {
  //   console.log('REQUEST INTERCEPTOR CATCH')
  //   return Promise.reject(err)
  // }
})
export default axiosInstance