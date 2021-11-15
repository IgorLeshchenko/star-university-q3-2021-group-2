import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import App, { AppRouting } from './App'
import { store } from './store/store'

test('renders forum page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const linkElement = screen.getByText(/posts/i)
  expect(linkElement).toBeInTheDocument()
})

test('Not Found page', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/some/bad/route')
  expect(getByTestId('not-found-page')).toBeInTheDocument()
})

test('Sign-up page', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/sign-up')
  expect(getByTestId('sign-up-page')).toBeInTheDocument()
})

test('Login page', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/login')
  expect(getByTestId('login-page')).toBeInTheDocument()
})
