// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {renderHook} from '@testing-library/react'

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toEqual(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toEqual(1)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toEqual(0)
})
test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({step: 2}))
  expect(result.current.count).toEqual(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toEqual(2)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toEqual(0)
})
