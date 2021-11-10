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
  const linkElement = screen.getByText(/forum page/i)
  expect(linkElement).toBeInTheDocument()
})

describe('given Routing', () => {
  it('should render Not Found component for invalid URL', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const { getByTestId } = render(
      <Router history={history}>
        <AppRouting />
      </Router>,
    )

    expect(getByTestId('not-found-page')).toBeInTheDocument()
  })
})
