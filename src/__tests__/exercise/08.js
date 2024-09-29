// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

let result
function TestComponent(props) {
  result = useCounter(props)
  return null
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />, {})
  expect(result.count).toEqual(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toEqual(1)
})
