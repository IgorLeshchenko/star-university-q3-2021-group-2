import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'

import { NotFound } from './NotFound'

describe('given Not Found component', () => {
  it('should render link to the posts page with proper text', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <NotFound />
      </Router>,
    )

    expect(screen.getByTestId('posts-link-text')).toHaveAttribute('href', ROUTES.POSTS)
    expect(screen.getByTestId('posts-link-text')).toHaveTextContent('Back to posts')
  })
})
