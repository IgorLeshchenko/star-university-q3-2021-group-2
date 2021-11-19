import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '../../../store/store'

import { SearchBar } from './index'

jest.mock('../../../store/selectors/posts')

describe('given SearchFilterParams component', () => {
  it('should render button with disabled state if search field was empty', async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    )
    expect(screen.getByRole('button', { name: /Clear text/i })).toHaveClass(
      'searchAndSortBar__searchBar__clearTextButton',
    )
  })
})
