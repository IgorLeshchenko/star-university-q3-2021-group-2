import React from 'react'

import { Header } from '../../components/Header'

import styles from './Login.module.scss'

export const Login = () => {
  return (
    <React.Fragment>
      <Header isLoginPage={true} />
      <div className={styles.login}>Login page</div>
    </React.Fragment>
  )
}
