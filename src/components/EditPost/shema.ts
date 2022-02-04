import * as yup from 'yup'

export const postUpdateValidationSchema = yup.object().shape({
  body: yup.string().min(2, 'Text should be 2 chars min!').required('Required field'),
})
