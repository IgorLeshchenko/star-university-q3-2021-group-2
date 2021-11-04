import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { Typography } from '../../../components/Typography'
import { sendPostRequest } from '../../../utils/api'
import { ROUTES } from '../../../utils/constants'
import { BUTTON_TYPE, INPUT_TYPE, TEXT_VARIANTS } from '../../../utils/enums'
import { ICreateUserValues } from '../interfaces'
import { signUpValidationSchema } from '../schema'

import classes from './SignUpForm.module.scss'

export const SignUpForm: React.FC = () => {
  const history = useHistory()

  const handleSubmit = async (user: ICreateUserValues) => {
    const result = await sendPostRequest('/users', user)

    if (result.statusCode >= 400) {
      formik.setStatus(result.validation.body.message)
    } else {
      history.push(ROUTES.LOGIN)
    }
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
    <div className={classes.signUpForm}>
      <div className={classes.signUpForm__content}>
        <Typography variant={TEXT_VARIANTS.H1} className={classes.title}>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
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
