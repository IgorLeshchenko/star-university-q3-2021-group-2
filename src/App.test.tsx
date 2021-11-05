import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store/store'

test('renders forum page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const linkElement = screen.getByText(/forum page/i)
  expect(linkElement).toBeInTheDocument()
})
