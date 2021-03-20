import API from '../../Api/api'

const teamsUrl = 'team-movements'

export const getTeamMembers = (teamId) => {
  return API.get(`/${teamsUrl}/${teamId}`)
}

export const addTeamMember = member => {
  return API.post(`/${teamsUrl}/add-user`, { ...member })
}

export const updateDate = (teamId, date) => {
  return API.put(`/${teamsUrl}/update-date/${teamId}`, { ...date })
}

export const removeTeamMember = (teamId) => {
  return API.delete(`/${teamsUrl}/remove-user/${teamId}`)
}