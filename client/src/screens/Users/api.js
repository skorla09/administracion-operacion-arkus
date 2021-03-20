import API from '../../Api/api'

const usersUrl = 'users'
export const getUsers = () => {
  return API.get(`/${usersUrl}`)
}

export const createUser = (user) => {
  return API.post(`/${usersUrl}/create`, { user })
}

export const updateUser = (userId, user) => {
  console.log(user)
  return API.put(`/${usersUrl}/${userId}`, { user })
}

export const deleteUser = (userId) => {
  return API.delete(`/${usersUrl}/${userId}`)
}

export const getUser = userId => {
  return API.get(`/${usersUrl}/${userId}`)
}

