import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { AuthService } from '../../../API/AuthService'
import { store } from '../../../store/store'
import { ROUTES } from '../../../utils/constants'

import { LoginForm } from './index'

jest.mock('../../../API/AuthService')

describe('given LoginForm component', () => {
  it('should render button with disabled state if both username and password is not filled', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )
    expect(screen.getByRole('button', { name: /Log in/i })).toBeDisabled()
  })

  it('should render button with disabled state if username is not filled ', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )

    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    expect(screen.getByRole('button', { name: /Log in/i })).toBeDisabled()
  })

  it('should render button with disabled state if password is not filled ', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )

    const passwordField = screen.getByPlaceholderText('Username')

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: 'username' } })
    })

    expect(screen.getByRole('button', { name: /Log in/i })).toBeDisabled()
  })

  it('should render button with active state if both username and password are filled', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    expect(screen.getByRole('button', { name: /Log in/i })).not.toBeDisabled()
  })

  it('should render error message if username less than 4 chars', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'use' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }))

    await waitFor(() => {
      expect(screen.getByText('Username should be 4 chars min!')).toBeInTheDocument()
    })
  })

  it('should render error message if password less than 8 chars', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'pass' } })
    })

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }))

    await waitFor(() => {
      expect(screen.getByText('Password should be 8 chars min!')).toBeInTheDocument()
    })
  })

  it('should redirect to posts page if login was successful', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=cookie',
    })

    const mockedLogin = jest.spyOn(AuthService, 'login')

    mockedLogin.mockResolvedValue({
      headers: {},
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')
    const btnSubmit = screen.getByRole('button', { name: /Log in/i })

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(history.location.pathname).toBe(ROUTES.POSTS)
    })
  })

  it('should render error message if login was not successful', async () => {
    const mockedLogin = jest.spyOn(AuthService, 'login')
    const error = {
      response: {
        status: 400,
      },
    }

    mockedLogin.mockRejectedValue(error)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    )

    const usernameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')
    const btnSubmit = screen.getByRole('button', { name: /Log in/i })

    await act(async () => {
      fireEvent.change(usernameField, { target: { value: 'username' } })
      fireEvent.change(passwordField, { target: { value: 'password' } })
    })

    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(screen.getByText('Check your name/password')).toBeInTheDocument()
    })
  })
})
