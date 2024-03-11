// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from '../../test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
const server = setupServer(...handlers)
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/

// 🐨 before all the tests, start the server with `server.listen()`
// 🐨 after all the tests, stop the server with `server.close()`
beforeAll(() => {
  return server.listen()
})

afterAll(() => {
  return server.close()
})

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  const loader = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(loader)

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`omitting a username displays an error`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()
  const usernameError = 'username required'
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  const loader = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(loader)
  expect(screen.getByText(usernameError)).toBeInTheDocument()
  expect(screen.getByRole('alert')).toBeInTheDocument()
})
test(`omitting a password displays an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()
  const passwordError = 'password required'
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  const loader = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(loader)
  expect(screen.getByText(passwordError)).toBeInTheDocument()
  expect(screen.getByRole('alert')).toBeInTheDocument()
})
