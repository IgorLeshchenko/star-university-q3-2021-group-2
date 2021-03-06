import { useFormik } from 'formik'
import React from 'react'

import { PostsService } from '../../API/PostsService'
import { ICreatePostRequest } from '../../models/CreatePostRequest'
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_TITLE,
  DEFAULT_SUCCESS_TITLE,
  SUCCESS_POST_CREATION_MESSAGE,
} from '../../utils/constants'
import { BUTTON_TYPE, INPUT_TYPE } from '../../utils/enums'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { toasterService } from '../Toast/ToastService'

import styles from './PostCreation.module.scss'
import { postCreationValidationSchema } from './shema'

interface Props {
  onCrossBtnHandler: React.MouseEventHandler
  isPostAdded: (e: boolean) => void
}
export const PostCreationModal: React.FC<Props> = ({ onCrossBtnHandler, isPostAdded }) => {
  const handleSubmit = async (post: ICreatePostRequest) => {
    PostsService.addPost(post)
      .then(() => {
        toasterService.success({
          title: DEFAULT_SUCCESS_TITLE,
          content: SUCCESS_POST_CREATION_MESSAGE,
        })
        isPostAdded(true)
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
      title: '',
      body: '',
    },
    validationSchema: postCreationValidationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <React.Fragment>
      <Modal showBackdrop={true} onCrossBtnClick={onCrossBtnHandler} className={styles.postModal}>
        <form onSubmit={formik.handleSubmit} className={styles.postModal__form}>
          <p className={styles['postModal__titlePost--margin']}>Create Post</p>
          <input
            className={styles['postModal__textField-title']}
            name="title"
            placeholder="Title"
            type={INPUT_TYPE.TEXT}
            value={formik.values.title}
            onChange={handleFieldChange}
            onBlur={formik.handleBlur}
          />
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
              + Create Post
            </Button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  )
}
