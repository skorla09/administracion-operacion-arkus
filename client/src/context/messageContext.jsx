import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export const MessageContext = React.createContext({
  showSuccessMessage: (message) => { },
  showErrorMessage: (message) => { }
})

export const MessageProvider = ({ children }) => {
  const [messageState, setMessageState] = useState({
    open: false,
    severity: "success",
    message: ''
  })

  const handleClose = (evt) => {
    setMessageState(prev => ({ ...prev, open: false }))
  }

  const showSuccessMessage = (message) => {
    setMessageState({
      open: true,
      severity: 'success',
      message
    })
  }

  const showErrorMessage = (message) => {
    setMessageState({
      open: true,
      severity: 'error',
      message
    })
  }

  return (
    <MessageContext.Provider value={{ showSuccessMessage, showErrorMessage }}>
      {children}
      <Snackbar open={messageState.open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={messageState.severity}>
          {messageState.message}
        </MuiAlert>
      </Snackbar>
    </MessageContext.Provider>
  )
}