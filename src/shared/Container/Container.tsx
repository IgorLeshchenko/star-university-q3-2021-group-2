import React from 'react'

import styles from './Container.module.scss'

const Container: React.FC<{ children: React.ReactChild; customClass?: string }> = ({ children, customClass = '' }) => {
  return <div className={`${styles.container} ${customClass}`}>{children}</div>
}

export default Container
