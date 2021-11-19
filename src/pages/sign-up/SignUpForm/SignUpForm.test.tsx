import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { AuthService } from '../../../API/AuthService'
import { ROUTES } from '../../../utils/constants'

import { SignUpForm } from './index'

jest.mock('../../../API/AuthService')

describe('given SignUpForm component', () => {
  it('should render button with disabled state if both username and password is not filled', async () => {
    render(<SignUpForm />)
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeDisabled()
  })

  it('should render button with disabled state if username is not filled ', async () => {
    render(<SignUpForm />)

    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeDisabled()
  })

  it('should render button with disabled state if password is not filled ', async () => {
    render(<SignUpForm />)

    const passwordField = screen.getByPlaceholderText('Username')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'username' } })
    })

    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeDisabled()
  })

  it('should render button with active state if both username and password are filled', async () => {
    render(<SignUpForm />)

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    expect(screen.getByRole('button', { name: /Sign Up/i })).not.toBeDisabled()
  })

  it('should render error message if username less than 4 chars', async () => {
    render(<SignUpForm />)

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'use' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    await waitFor(() => {
      expect(screen.getByText('Username should be 4 chars min!')).toBeInTheDocument()
    })
  })

  it('should render error message if password less than 8 chars', async () => {
    render(<SignUpForm />)

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'pass' } })
    })

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    await waitFor(() => {
      expect(screen.getByText('Password should be 8 chars min!')).toBeInTheDocument()
    })
  })

  it('should redirect to login page if sign up was successful', async () => {
    const mockedSignUp = jest.spyOn(AuthService, 'signUp')
    mockedSignUp.mockResolvedValue({} as AxiosResponse)

    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <SignUpForm />
      </Router>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')
    const btnSubmit = screen.getByRole('button', { name: /Sign Up/i })

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(history.location.pathname).toBe(ROUTES.LOGIN)
    })
  })
})
