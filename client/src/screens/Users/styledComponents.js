import styled from 'styled-components'
import DeleteOutlineRounded from '@material-ui/icons/DeleteRounded'
import TableRow from '@material-ui/core/TableRow'

export const StyledForm = styled.form`
  .MuiTextField-root {
    width: 100%;
  }
`

export const TitleRow = styled.div`
  margin-bottom: 30px;
`

export const ActionsRow = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 20px;
  }
`

export const CreateUserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`
export const StyledDelete = styled(DeleteOutlineRounded)`
  cursor: pointer;
`

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;

  &&:hover {
    background-color: #f8f8f8;
  }
`