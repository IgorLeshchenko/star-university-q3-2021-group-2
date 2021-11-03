import React from 'react'

import Hero from '../../components/Hero/Hero'

import classes from './SignUp.module.scss'
import SignUpForm from './SignUpForm'

const SignUp = () => {
  return (
    <div className={classes.signUp}>
      <SignUpForm />
      <Hero />
    </div>
  )
}

export default SignUp
