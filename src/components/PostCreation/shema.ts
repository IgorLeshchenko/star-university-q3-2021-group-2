import * as yup from 'yup'

export const postCreationValidationSchema = yup.object().shape({
  title: yup.string().min(2, 'Title should be 2 chars min!').required('Required field'),
  body: yup.string().min(2, 'Text should be 2 chars min!').required('Required field'),
})
