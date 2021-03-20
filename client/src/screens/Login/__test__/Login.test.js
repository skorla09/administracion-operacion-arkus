import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Login } from '../index'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe.only('Login Screen Tests', () => {
  it('Renders without crashing', () => {
    const { getByLabelText, getByRole, getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    expect(getByTestId(/header/i)).toBeInTheDocument()
    expect(getByLabelText(/Username/i)).toBeInTheDocument()
    expect(getByLabelText(/Password/i)).toBeInTheDocument()
    expect(getByRole(/button/)).toBeInTheDocument()
  })
  it('Should render disabled login button when no username and password', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const button = getByRole(/button/)
    expect(button).toBeDisabled()
  })
  it('Should be able to click login button after username and password are filled', async () => {
    const { getByRole, getByLabelText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = getByLabelText(/Username/i)
    const password = getByLabelText(/Password/i)
    const submit = getByRole('button')

    await waitFor(() => {
      fireEvent.change(username, {
        target: {
          value: 'user1@email.com'
        }
      })
    })
    expect(username).toHaveDisplayValue('user1@email.com')

    await waitFor(() => {
      fireEvent.change(password, {
        target: {
          value: 'passwoord123'
        }
      })
    })
    expect(password).toHaveDisplayValue('passwoord123')

    const clicked = await waitFor(() => {
      return fireEvent.click(submit)
    })

    expect(submit).not.toBeDisabled()
    expect(clicked).toBeTruthy()
  })

})