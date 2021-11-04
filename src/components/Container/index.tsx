import React from 'react'

import styles from './Container.module.scss'

interface Props {
  customClass?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, customClass = '' }) => {
  return <div className={`${styles.container} ${customClass}`}>{children}</div>
}
