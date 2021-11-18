import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AuthService } from '../../../API/AuthService'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { Typography } from '../../../components/Typography'
import { ICreateUserRequest } from '../../../models/CreateUserRequest'
import { login } from '../../../store/userSlice'
import { ROUTES } from '../../../utils/constants'
import { BUTTON_TYPE, INPUT_TYPE, TEXT_VARIANTS } from '../../../utils/enums'
import { setUserToLocalStorage } from '../../../utils/local-storage'
import { loginValidationSchema } from '../schema'

import classes from './LoginForm.module.scss'

const NOT_VALID_USER_ERROR_MESSAGE = 'Check your name/password'

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (user: ICreateUserRequest) => {
    AuthService.login(user)
      .then((response) => {
        setUserToLocalStorage({
          username: user.username,
          loggedIn: true,
        })
        dispatch(
          login({
            username: user.username,
            loggedIn: true,
          }),
        )
        Cookies.set('accessToken', response.headers['accesstoken'])
        Cookies.set('refreshToken', response.headers['refreshtoken'])
        Cookies.set('username', response.headers['username'])
        history.push(ROUTES.POSTS)
      })
      .catch((error) => {
        if (error.response.status >= 400) {
          formik.setStatus(NOT_VALID_USER_ERROR_MESSAGE)
        }
      })
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLElement>) => {
    formik.handleChange(event)
    formik.setStatus(null)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className={classes.loginForm}>
      <div className={classes.loginForm__content}>
        <Typography variant={TEXT_VARIANTS.H1} className={classes.loginForm__content__title}>
          Log in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.textField}
            id="username"
            name="username"
            label="Username"
            type={INPUT_TYPE.TEXT}
            value={formik.values.username}
            onChange={handleFieldChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username ? formik.errors.username : ''}
          />
          <TextField
            className={classes.textField}
            id="password"
            name="password"
            label="Password"
            type={INPUT_TYPE.PASSWORD}
            value={formik.values.password}
            onChange={handleFieldChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ''}
          />
          {formik.status && (
            <Typography variant={TEXT_VARIANTS.BODY} className={classes.loginForm__apiError}>
              {formik.status}
            </Typography>
          )}
          <Button
            className={classes.loginForm__submit}
            type={BUTTON_TYPE.SUBMIT}
            disabled={!(formik.values.username && formik.values.password)}
            primary={!!(formik.values.username && formik.values.password)}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  )
}
