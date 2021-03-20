import styled from 'styled-components'
import Toolbar from '@material-ui/core/Toolbar'

export const container = styled.div`
  display: flex;
`
export const LayoutContent = styled.div`
  margin: 70px 30px 0 30px;
  height: 100%;
`

export const StyledUserInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  
  .info-alignment {
    text-align: right;
    margin-right: 15px;
  }
`

export const StyledToolbar = styled(Toolbar)`
display: flex;
justify-content: space-between;
width: 100%;
` 