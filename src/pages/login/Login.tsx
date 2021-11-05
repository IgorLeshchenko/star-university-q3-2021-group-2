import React from 'react'

import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero/Hero'

import styles from './Login.module.scss'
import { LoginForm } from './LoginForm'

export const Login = () => {
  return (
    <div className={styles.login}>
      <Header isLoginPage={true} />
      <LoginForm />
      <Hero />
    </div>
  )
}
