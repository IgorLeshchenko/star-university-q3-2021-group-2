import React from 'react'

import { Header } from '../../components/Header'

import styles from './Profile.module.scss'

export const Profile = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.Profile}>Profile page</div>
    </React.Fragment>
  )
}
