import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
`

export const FormContainer = styled.div`
  width: 400px;
  margin: 40px auto 0 auto;
`

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 30px;
    width: 100%;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const StyledImg = styled.img`
margin-bottom: 50px;
  width: 25%;
`