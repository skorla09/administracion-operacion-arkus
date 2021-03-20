import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MessageContext } from '../../../context/messageContext'
import Modal from '../../../components/Modal'
import { getUsers } from '../../Users/api'
import { getTeamMembers, addTeamMember } from '../api'
// import CustomTable from '../../../components/CustomTable'
import { StyledFormControl } from './styledComponents'



const AddUserForm = ({ open = false, onAccept, onClose = () => { } }) => {
  const [usersList, setUsersList] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())
  const { showErrorMessage } = useContext(MessageContext)
  const { accountId } = useParams()

  const formik = useFormik({
    selectedUser: ''
  })

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      console.log('FETCH USERS')
      console.log(response)
      if (response.status === 200) {
        setUsersList(response.data)
      } else {
        showErrorMessage('Error al obtener la lista de integrantes')
      }
    } catch (error) {
      console.log('GET USERS ERROR')
      console.log(error)
      showErrorMessage(error.data.message)
    }
  }

  // const fetchTeamMovements = async () => {
  //   try {
  //     const accounts = await getTeamMembers(accountId)
  //     console.log('========GET ACCOUNTS')
  //     console.log(accounts)
  //   } catch (error) {
  //     console.log(error)
  //     showErrorMessage(error.data.message)
  //   }
  // }

  const handleAddTeamMember = async () => {
    // try {
    const values = {
      userId: selectedUser,
      startDate,
      endDate,
      accountId
    }
    onAccept(values)
    //   const response = await addTeamMember(values)
    //   console.log('ADD TEAM MEMBER')
    //   console.log(values)
    //   if (response.status !== 200) {
    //     showErrorMessage('Error al dar de alta integrante')
    //   }
    //   onClose()
    // } catch (error) {
    //   console.log('ADD MEMBER ERROR')
    //   console.log(error)
    // }
  }

  const handleSelectUser = evt => {
    console.log(evt.target)
    const user = evt.target.value
    console.log('SELECT USER ======= ')
    console.log(user)
    setSelectedUser(user)
  }

  // const handleSelectDate = (date, value) => {
  //   console.log('HANDLE SELECT DATE')
  //   console.log(date)
  //   console.log(value)
  //   setStartDate(date)
  // }

  useEffect(() => {
    fetchUsers()
  }, [])

  const selectOptions = usersList.length && usersList.map((user, index) => {
    console.log(user)
    return (<MenuItem key={index} value={user._id}>
      {user.name}
    </MenuItem>)
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onAccept={handleAddTeamMember}
      title="Agregar integrante al equipo"
    >
      <StyledFormControl>
        <InputLabel color="secondary">Seleccionar usuario</InputLabel>
        <Select value={selectedUser} onClick={handleSelectUser} color="secondary">
          {selectOptions}
        </Select>
        <FormHelperText></FormHelperText>
      </StyledFormControl>
      <div>
        <Typography variant="body2" color="secondary">Fecha de Inicio</Typography>
        <StyledFormControl>
          <KeyboardDatePicker
            autoOk={true}
            showTodayButton={true}
            value={startDate}
            format="DD/MM/YYYY"
            onChange={setStartDate}
            minDate={startDate}
          />
        </StyledFormControl>
        <Typography variant="body2" color="secondary">Fecha Fin</Typography>
        <StyledFormControl>
          <KeyboardDatePicker
            autoOk={true}
            showTodayButton={true}
            value={endDate}
            format="DD/MM/YYYY"
            onChange={setEndDate}
            minDate={startDate}
          />
        </StyledFormControl>
      </div>
    </Modal>
  )
}

export default AddUserForm