import React from 'react'
import { useHistory } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { StyledMenuItem } from './styledComponents'
import { SIDEBAR_ROUTES } from '../../constants'
import { isAdminUser } from '../../utils/userUtils'
const { USERS, ACCOUNTS, MOVEMENTS, /*CONTROL*/ } = SIDEBAR_ROUTES

const Sidebar = ({ selectedRoute, open, onClose }) => {
  const history = useHistory()
  const isAdmin = isAdminUser()

  const handleGoTo = evt => {
    const { id } = evt.target
    history.push(`/${id}`)
    onClose()
  }

  return (
    <Drawer open={open} onClose={onClose} variant="temporary">
      <List>
        <StyledMenuItem selected={selectedRoute === ''} onClick={handleGoTo}>HOME</StyledMenuItem>
        <StyledMenuItem id="usuarios" selected={selectedRoute === USERS} onClick={handleGoTo} disabled={!isAdmin}>USUARIOS</StyledMenuItem>
        <StyledMenuItem id="cuentas" selected={selectedRoute === ACCOUNTS} onClick={handleGoTo} disabled={!isAdmin}>CUENTAS</StyledMenuItem>
        {/* <StyledMenuItem id="control-de-equipos" selected={selectedRoute === CONTROL} onClick={handleGoTo} disabled={!isAdmin}>CONTROL DE EQUIPOS</StyledMenuItem> */}
        <StyledMenuItem id="movimientos" selected={selectedRoute === MOVEMENTS} onClick={handleGoTo} disabled={!isAdmin}>LOG DE MOVIMIENTOS</StyledMenuItem>
      </List>
    </Drawer>
  )
}

Sidebar.defaultProps = {
  selectedRoute: '',
  open: false,
  onClose: () => { }
}

export default Sidebar