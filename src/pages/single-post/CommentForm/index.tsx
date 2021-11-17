import cn from 'classnames'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { PostsService } from '../../../API/PostsService'
import { Button } from '../../../components/Button'
import { Spinner } from '../../../components/Spinner'
import { toasterService } from '../../../components/Toast/ToastService'
import { ICreatePostRequest } from '../../../models/CreatePostRequest'
import { selectUser } from '../../../store/selectors/users'
import { DEFAULT_ERROR_MESSAGE } from '../../../utils/constants'
import { BUTTON_TYPE } from '../../../utils/enums'

import styles from './CommentForm.module.scss'
import { commentValidationSchema } from './schema'

interface IProps {
  id: string
}

export const CommentForm: React.FC<IProps> = ({ id }) => {
  const { loggedIn } = useSelector(selectUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (post: ICreatePostRequest) => {
    //change with modal error
    if (!loggedIn) {
      return
    }

    setIsLoading(true)

    PostsService.addPost(post)
      .then(() => {
        formik.resetForm()
        toasterService.success({
          title: 'Success',
          content: 'Comment was added',
        })
      })
      .catch((error) => {
        if (error.response.status >= 400) {
          toasterService.success({
            title: 'Error',
            content: DEFAULT_ERROR_MESSAGE,
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

  const formik = useFormik({
    initialValues: {
      title: 'Comment',
      body: '',
      parent: id,
    },
    validationSchema: commentValidationSchema,
    onSubmit: handleSubmit,
  })

  const handleFieldChange = (event: React.ChangeEvent<HTMLElement>) => {
    formik.handleChange(event)
    formik.setStatus(null)
  }

  return (
    <form onSubmit={formik.handleSubmit} className={styles['comment-form']}>
      <div className={styles['comment-form__field-wrapper']}>
        <textarea
          name="body"
          placeholder="Add comment..."
          className={styles['comment-form__field']}
          value={formik.values.body}
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.body && formik.errors.body && (
          <span className={cn(styles['comment-form__field-status'], styles['comment-form__status--error'])}>
            {formik.errors.body}
          </span>
        )}
      </div>
      <Button
        type={BUTTON_TYPE.SUBMIT}
        primary={true}
        disabled={!formik.values.body}
        className={styles['comment-form__btn']}
      >
        {isLoading ? <Spinner className={styles['comment-form__spinner']} /> : 'Comment'}
      </Button>
    </form>
  )
}