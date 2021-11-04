import React from 'react'

import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero/Hero'

import classes from './SignUp.module.scss'
import { SignUpForm } from './SignUpForm'

export const SignUp = () => {
  return (
    <React.Fragment>
      <Header isSignupPage={true} />
      <div className={classes.signUp}>
        <SignUpForm />
        <Hero />
      </div>
    </React.Fragment>
  )
}
