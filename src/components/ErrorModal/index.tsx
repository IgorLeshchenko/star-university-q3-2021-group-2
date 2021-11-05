import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'
import { Modal } from '../Modal'

import styles from './ErrorModal.module.scss'

export const ErrorModal: React.FC<{ onCrossBtnHandler: React.MouseEventHandler }> = ({ onCrossBtnHandler }) => {
  return (
    <Modal showBackdrop={true} contentWidth={645} onCrossBtnClick={onCrossBtnHandler} className={styles.errorModal}>
      <div className={styles.errorModal__content}>
        <p>
          <span>Please </span>
          <Link to={ROUTES.LOGIN} className={styles.errorModal__link}>
            Log In
          </Link>
          <span> or </span>
          <Link to={ROUTES.SIGN_UP} className={styles.errorModal__link}>
            Sign Up
          </Link>
          <span> to continue.</span>
        </p>
      </div>
    </Modal>
  )
}
