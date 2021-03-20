import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'

const Modal = ({ open, title, onClose, withCustomActions, onAccept, onCancel, children }) => {
  return (
    <Dialog {...{ open, onClose }}>
      <DialogTitle><div><Typography variant="h5" color="primary">{title}</Typography></div></DialogTitle>
      <DialogContent>{children}</DialogContent>
      {!withCustomActions && <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
        <Button variant="outlined" color="primary" onClick={onAccept}>Aceptar</Button>
      </DialogActions>}
    </Dialog>
  )
}

Modal.defaultProps = {
  open: false,
  title: '',
  withCustomActions: false,
  onAccept: () => { },
  onCancel: () => { },
  onClose: () => { }
}

export default Modal