import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import MainLayout from '../index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('MainLayout Tests', () => {
  it('Renders without crashing', () => {
    const { debug, getByText } = render(
      <MemoryRouter>
        <MainLayout>
          <div>this is the main layout content</div>
        </MainLayout>
      </MemoryRouter>
    )

    expect(getByText(/main layout contentasdas/i)).toBeInTheDocument()
    debug()
  })
})