import React from 'react'

import { Header } from '../../components/Header'

import styles from './NotFound.module.scss'

export const NotFound = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.NotFound}>Not Found page</div>
    </React.Fragment>
  )
}
