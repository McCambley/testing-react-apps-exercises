// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import {render as renderWithTheme} from 'test/test-utils'

test('renders with the light styles for the light theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
    `)
})

test('renders with the dark styles for the light theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  }
  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
    `)
})
/* eslint no-unused-vars:0 */
