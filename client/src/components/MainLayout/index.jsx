import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import { MessageContext } from '../../context/messageContext'
import { LayoutContent, StyledUserInfo, StyledToolbar } from './styledComponents'
import Sidebar from '../Sidebar'
import { getUserFromLocal, removeUserFromLocal } from '../../utils/userUtils'
import API from '../../Api/api'


const MainLayout = ({ route, children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [popoverAnchor, setPopoverAnchor] = useState(null)
  const { showErrorMessage } = useContext(MessageContext)
  const history = useHistory()

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const open = Boolean(popoverAnchor);

  const handleOpenSidebar = _evt => {
    setSidebarVisible(true)
  }

  const user = getUserFromLocal()
  const userName = get(user, 'user.name', '')
  const userRole = get(user, 'user.role', '')
  const userId = get(user, 'user._id', '')

  const handleGotoProfileDetails = evt => {
    history.push(`/usuarios/${userId}`)
  }

  const handleLogout = async evt => {
    try {
      await API.post('/authentication/logout')
      removeUserFromLocal()
      history.push('/login')

    } catch (error) {
      showErrorMessage('Error at user logout.')
    }
  }

  if (!user) {
    history.push('/login')
  }

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleOpenSidebar}
          >
            <MenuIcon />
          </IconButton>
          <StyledUserInfo
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}

          >
            <div className='info-alignment'>
              <Typography variant="subtitle1">{userName}</Typography>
              <Typography variant="body2">{userRole}</Typography>
            </div>
            <Popover
              open={open}
              anchorEl={popoverAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <MenuItem><Typography color="primary" onClick={handleGotoProfileDetails}>PROFILE DETAILS</Typography></MenuItem>
              <MenuItem><Typography color="primary" onClick={handleLogout}>LOGOUT</Typography></MenuItem>
            </Popover>
            <Avatar
              src="/broken-image.jpg"
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
            />

          </StyledUserInfo>
        </StyledToolbar>
      </AppBar>
      <Sidebar selectedRoute={route} open={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <LayoutContent>{children}</LayoutContent>
    </>
  )
}

export default MainLayout