import { useFormik } from 'formik'
import React from 'react'

import { PostsService } from '../../API/PostsService'
import { ICreatePostRequest } from '../../models/CreatePostRequest'
import { BUTTON_TYPE, INPUT_TYPE } from '../../utils/enums'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { toasterService } from '../Toast/ToastService'

import styles from './PostCreation.module.scss'
import { postCreationValidationSchema } from './shema'

export const PostCreationModal: React.FC<{ onCrossBtnHandler: React.MouseEventHandler }> = ({ onCrossBtnHandler }) => {
  const handleSubmit = async (post: ICreatePostRequest) => {
    PostsService.addPost(post)
      .then(() =>
        toasterService.success({
          title: 'Success',
          content: 'Post uploaded:)',
        }),
      )

      .catch((error) => {
        if (error.response.status >= 400) {
          formik.setStatus(
            toasterService.error({
              title: 'Error',
              content: 'Something went wrong:(',
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
            {formik.touched.title && formik.errors.title && <span>{formik.errors.title}</span>}
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
            {formik.touched.body && formik.errors.body && <span>{formik.errors.body}</span>}
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
