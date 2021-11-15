import React from 'react'

import { Header } from '../../components/Header'

import styles from './SinglePost.module.scss'

export const SinglePost = () => {
  return (
    <React.Fragment>
      <Header isSignupPage={true} />
      <div className={styles.SinglePost} data-testid="single-post-page">
        Single post page
      </div>
    </React.Fragment>
  )
}
