import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { PostsService } from '../../API/PostsService'
import { setIsEdited } from '../../store/postsSlice'
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_TITLE,
  DEFAULT_SUCCESS_TITLE,
  SUCCESS_POST_DELETE_MESSAGE,
} from '../../utils/constants'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { Spinner } from '../Spinner'
import { toasterService } from '../Toast/ToastService'

import styles from './DeleteModal.module.scss'

export const DeletePostModal: React.FC<{ onCrossBtnHandler: React.MouseEventHandler; id: string }> = ({
  onCrossBtnHandler,
  id,
}) => {
  const [canDelete, setCanDelete] = useState(true)
  const dispatch = useDispatch()
  const deletePost = async (id: string) => {
    try {
      setCanDelete(false)
      await PostsService.deletePost(id)

      toasterService.success({
        title: DEFAULT_SUCCESS_TITLE,
        content: SUCCESS_POST_DELETE_MESSAGE,
      })
      dispatch(setIsEdited(true))
    } catch (error) {
      toasterService.error({
        title: DEFAULT_ERROR_TITLE,
        content: DEFAULT_ERROR_MESSAGE,
      })
    } finally {
      setCanDelete(true)
    }
  }

  return (
    <Modal showBackdrop={true} contentWidth={645} onCrossBtnClick={onCrossBtnHandler} className={styles.errorModal}>
      <div className={styles.deleteModal__title}>Do you want to delete content?</div>
      <div className={styles.deleteModal__content}>
        {canDelete ? (
          <Button
            className={styles.deleteModal__button}
            onClick={() => {
              deletePost(id)
            }}
          >
            Delete
          </Button>
        ) : (
          <Spinner />
        )}

        {canDelete && (
          <Button className={styles.deleteModal__button} onClick={onCrossBtnHandler}>
            Cancel
          </Button>
        )}
      </div>
    </Modal>
  )
}
