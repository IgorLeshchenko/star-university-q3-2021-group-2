import React from 'react'

import Header from '../../components/Header'

import styles from './Posts.module.scss'

const Posts = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.Profile}>Forum page</div>
    </React.Fragment>
  )
}

export default Posts
