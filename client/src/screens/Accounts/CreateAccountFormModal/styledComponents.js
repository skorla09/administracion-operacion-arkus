import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'

export const StyledForm = styled.form`
  .MuiTextField-root {
    margin-bottom: 10px;
  }
`

export const ActionsRow = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 20px;
  }
`

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`