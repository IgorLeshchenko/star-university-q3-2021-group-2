import classNames from 'classnames'
import React from 'react'

import classes from './Button.module.scss'

interface IButton {
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  children: React.ReactNode
  primary?: boolean
}

const Button = ({ className, type = 'button', disabled, children, primary = false }: IButton) => {
  return (
    <button
      className={classNames(classes.button, className, {
        [classes.button__disabled]: disabled,
        [classes.button__primary]: primary,
      })}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
