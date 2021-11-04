import React from 'react'

import { Header } from '../../components/Header'

import styles from './Posts.module.scss'

export const Posts = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.Posts}>Forum page</div>
    </React.Fragment>
  )
}
