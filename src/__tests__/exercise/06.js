// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
import {faker} from '@faker-js/faker'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const errorMessage = faker.lorem.sentence()
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 135,
    },
  }
  let setState
  useCurrentPosition.mockImplementation(() => {
    const [state, updater] = React.useState([])
    setState = updater
    return state
  })

  render(<Location />)

  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()
  act(() => {
    setState([null, {message: errorMessage}])
  })
  expect(screen.getByRole('alert').textContent).toBe(errorMessage)
  act(() => {
    setState([fakePosition, null])
  })
  expect(screen.getByText(/latitude/i)).toHaveTextContent('Latitude: 35')
  expect(screen.getByText(/longitude/i)).toHaveTextContent('Longitude: 135')
})

/*
eslint
  no-unused-vars: "off",
*/
