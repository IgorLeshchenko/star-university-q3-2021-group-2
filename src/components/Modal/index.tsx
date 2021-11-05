import cn from 'classnames'
import React from 'react'

import styles from './Modal.module.scss'

interface IModal {
  showBackdrop?: boolean
  contentWidth?: number
  onCrossBtnClick?: React.MouseEventHandler
  className?: string
}

export const Modal: React.FC<React.PropsWithChildren<IModal>> = ({
  children,
  showBackdrop = true,
  contentWidth = 645,
  onCrossBtnClick,
  className,
}) => {
  return (
    <div className={cn(styles.modal, { [styles['modal--shadow']]: showBackdrop }, className)}>
      <div className={styles.modal__container} style={{ maxWidth: `${contentWidth}px` }}>
        <div className={styles.modal__content}>{children}</div>

        {onCrossBtnClick && (
          <button className={cn(styles.modal__btn, styles['modal__btn--cross'])} onClick={onCrossBtnClick}></button>
        )}
      </div>
    </div>
  )
}
