import React from 'react'
import { render } from '@testing-library/react'
import { CustomTable } from '../index'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

describe('Test for the CustomTable component', () => {
  it('Should render without crashing', () => {

    const tableHeaders = ['Header1', 'Header2', 'Header3', '']
    const items = ['item1', 'item2', 'item3']
    const tableContent = items.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item}</TableCell>
      </TableRow>
    ))

    const { getByText } = render(
      <CustomTable headers={tableHeaders} tableContent={tableContent} />
    )

    expect(getByText(/Header1/i)).toBeInTheDocument()
    expect(getByText(/Header2/i)).toBeInTheDocument()
    expect(getByText(/Header3/i)).toBeInTheDocument()
    expect(getByText(/item1/i)).toBeInTheDocument()
    expect(getByText(/item2/i)).toBeInTheDocument()
    expect(getByText(/item3/i)).toBeInTheDocument()
  })
})