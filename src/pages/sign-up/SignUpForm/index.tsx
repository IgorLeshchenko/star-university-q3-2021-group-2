import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { AuthService } from '../../../API/AuthService'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { Typography } from '../../../components/Typography'
import { ICreateUserRequest } from '../../../models/CreateUserRequest'
import { ROUTES } from '../../../utils/constants'
import { BUTTON_TYPE, INPUT_TYPE, TEXT_VARIANTS } from '../../../utils/enums'
import { signUpValidationSchema } from '../schema'

import classes from './SignUpForm.module.scss'

const USERNAME_ALREADY_EXISTS = 'username already exists'
const USERNAME_ALREADY_EXISTS_ERROR_MESSAGE =
  'User with this name has been already registered: try another username or login'

export const SignUpForm: React.FC = () => {
  const history = useHistory()

  const handleSubmit = async (user: ICreateUserRequest) => {
    AuthService.signUp(user)
      .then(() => history.push(ROUTES.LOGIN))
      .catch((error) => {
        if (error.response.status >= 400) {
          const errorMessage = error.response.data.validation.body.message
          formik.setStatus(
            errorMessage === USERNAME_ALREADY_EXISTS ? USERNAME_ALREADY_EXISTS_ERROR_MESSAGE : errorMessage,
          )
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
    validationSchema: signUpValidationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className={classes.signUpForm} data-testid="sign-up-page">
      <div className={classes.signUpForm__content}>
        <Typography variant={TEXT_VARIANTS.H1} className={classes.signUpForm__content__title}>
          Sign Up
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
            <Typography variant={TEXT_VARIANTS.BODY} className={classes.signUpForm__apiError}>
              {formik.status}
            </Typography>
          )}
          <Button
            className={classes.signUpForm__submit}
            type={BUTTON_TYPE.SUBMIT}
            disabled={!(formik.values.username && formik.values.password)}
            primary={!!(formik.values.username && formik.values.password)}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}
