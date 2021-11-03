import * as yup from 'yup'

export const signUpValidationSchema = yup.object({
  username: yup.string().min(4, 'Username should be 4 chars min!').required('Username is required'),
  password: yup.string().min(5, 'Password should be 5 chars min!').required('Password is required'),
})
