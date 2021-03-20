import API from '../../Api/api'

const accountsUrl = 'accounts'
export const getAccounts = () => {
  return API.get(`/${accountsUrl}`)
}

export const createAccount = (account) => {
  return API.post(`/${accountsUrl}/`, { account })
}

export const updateAccount = (accountId, account) => {
  console.log(account)
  return API.put(`/${accountsUrl}/${accountId}`, { account })
}

export const deleteAccount = (accountId) => {
  return API.delete(`/${accountsUrl}/${accountId}`)
}

export const getaAccount = accountId => {
  return API.get(`/${accountsUrl}/${accountId}`)
}

