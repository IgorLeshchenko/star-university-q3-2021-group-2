import * as yup from 'yup'

export const loginValidationSchema = yup.object({
  username: yup.string().min(4, 'Username should be 4 chars min!').required('Username is required'),
  password: yup.string().min(8, 'Password should be 8 chars min!').required('Password is required'),
})
