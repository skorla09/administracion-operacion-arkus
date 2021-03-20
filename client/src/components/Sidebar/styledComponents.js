import styled from 'styled-components'
import MenuItem from '@material-ui/core/MenuItem'

export const StyledMenuItem = styled(MenuItem)`
  &&& {
    background-color: ${({ selected }) => selected ? '#f23e02' : '#fff'};
    color: ${({ selected }) => selected ? '#fff' : '#f23e02'};
    cursor: pointer;
  }
 &&:hover {
    cursor: pointer;
    background-color: #2c6b74;
    color: #fff;
  }
`