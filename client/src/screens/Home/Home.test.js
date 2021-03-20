import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Home } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Home Screen Tests', () => {
  it('Call history.push if user is not Logged In', () => {
    const isUserLoggedIn = jest.fn().mockReturnValueOnce(false).mockName('isUsrLoggedIn')
    const loggedIn = isUserLoggedIn()

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(isUserLoggedIn).toHaveBeenCalled()
    expect(loggedIn).toBeFalsy()
    expect(mockHistoryPush).toHaveBeenCalledWith('/login')
  })

  it('Should render Home Screen', () => {
    const isUserLoggedIn = jest.fn().mockReturnValueOnce(true).mockName('isUsrLoggedIn')
    const loggedIn = isUserLoggedIn()

    const { getByText, debug } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const titleElement = getByText(/Administración de Operación/i)
    expect(titleElement).toBeInTheDocument()
  })
})
