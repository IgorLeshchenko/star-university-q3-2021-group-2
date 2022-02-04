import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

import { PostsService } from '../../API/PostsService'
import { ICreatePostRequest } from '../../models/CreatePostRequest'
import { setIsEdited } from '../../store/postsSlice'
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_TITLE,
  DEFAULT_SUCCESS_TITLE,
  SUCCESS_POST_UPDATE_MESSAGE,
} from '../../utils/constants'
import { BUTTON_TYPE } from '../../utils/enums'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { toasterService } from '../Toast/ToastService'

import styles from './EditPost.module.scss'
import { postUpdateValidationSchema } from './shema'

interface Props {
  onCrossBtnHandler: React.MouseEventHandler
  body: string
  id: string
}
export const EditPostModal: React.FC<Props> = ({ onCrossBtnHandler, body, id }) => {
  const dispatch = useDispatch()
  const handleSubmit = async (post: ICreatePostRequest) => {
    PostsService.editPost(id, post.body)
      .then(() => {
        toasterService.success({
          title: DEFAULT_SUCCESS_TITLE,
          content: SUCCESS_POST_UPDATE_MESSAGE,
        })
        dispatch(setIsEdited(true))
      })

      .catch((error) => {
        if (error.response.status >= 400) {
          formik.setStatus(
            toasterService.error({
              title: DEFAULT_ERROR_TITLE,
              content: DEFAULT_ERROR_MESSAGE,
            }),
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
      body: body,
    },
    validationSchema: postUpdateValidationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <React.Fragment>
      <Modal showBackdrop={true} onCrossBtnClick={onCrossBtnHandler} className={styles.postModal}>
        <form onSubmit={formik.handleSubmit} className={styles.postModal__form}>
          <p className={styles['postModal__titlePost--margin']}>Update Message</p>
          <div className={styles['postModal__require--padding']}>
            {formik.touched.title && formik.errors.title && (
              <div className={styles['postModal__error-message']}>{formik.errors.title}</div>
            )}
          </div>
          <textarea
            className={styles['postModal__textField-body']}
            name="body"
            placeholder="Text"
            value={formik.values.body}
            onChange={handleFieldChange}
            onBlur={formik.handleBlur}
          />
          <div className={styles['postModal__require--padding']}>
            {formik.touched.body && formik.errors.body && (
              <div className={styles['postModal__error-message']}>{formik.errors.body}</div>
            )}
          </div>
          <div className={styles['postModal__button--justify']}>
            <Button
              className={styles.postModal__button}
              type={BUTTON_TYPE.SUBMIT}
              disabled={!formik.isValid && !formik.dirty}
              primary={!!formik.isValid && !!formik.dirty}
            >
              Edit
            </Button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  )
}
