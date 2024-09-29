// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useCounter(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

test('allows customization of the initial count', () => {
  const result = setup()
  expect(result.count).toEqual(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toEqual(1)
  act(() => {
    result.decrement()
  })
  expect(result.count).toEqual(0)
})
test('allows customization of the step', () => {
  const result = setup({step: 2})
  expect(result.count).toEqual(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toEqual(2)
  act(() => {
    result.decrement()
  })
  expect(result.count).toEqual(0)
})
