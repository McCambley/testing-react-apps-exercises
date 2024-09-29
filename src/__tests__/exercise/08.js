// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function TestComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div title="div">{count}</div>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => increment()}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<TestComponent />, {})
  // 🐨 get the elements you need using screen
  const button = screen.getByRole('button', {name: /decrement/i})
  expect(button).toBeVisible()
  // 🐨 assert on the initial state of the hook
  const div = screen.getByTitle('div')
  expect(div).toHaveTextContent('0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  act(() => {
    button.click()
  })
  expect(div).toHaveTextContent('-1')
})

/* eslint no-unused-vars:0 */
