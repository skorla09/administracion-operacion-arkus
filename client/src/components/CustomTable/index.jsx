import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export const CustomTable = ({ headers, tableContent }) => {

  const renderHeaders = headers.map((header, index) => (
    <TableCell key={index}>
      <Typography variant="body1">{header}</Typography>
    </TableCell>
  ))

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow >{renderHeaders}</TableRow></TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

CustomTable.defaultProps = {
  headers: [],
  tableContent: null
}

export default CustomTable