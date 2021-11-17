import * as yup from 'yup'

export const commentValidationSchema = yup.object({
  body: yup.string().required('Comment is required'),
})
