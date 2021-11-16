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
  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/some/bad/route')
  const element = screen.getByText(/404 page/i)
  expect(element).toBeInTheDocument()
})

test('Sign-up page', () => {
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/sign-up')
  const elements = screen.getAllByText(/sign up/i)
  elements.forEach((e) => {
    expect(e).toBeInTheDocument()
  })
})

test('Login page', () => {
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRouting />
      </Router>
    </Provider>,
  )
  history.push('/login')
  const elements = screen.getAllByText(/log in/i)
  elements.forEach((e) => {
    expect(e).toBeInTheDocument()
  })
})
