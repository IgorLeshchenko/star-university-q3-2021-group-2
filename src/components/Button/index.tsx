import classNames from 'classnames'
import React from 'react'

import classes from './Button.module.scss'

interface IButton {
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  primary?: boolean
}

export const Button: React.FC<React.PropsWithChildren<IButton>> = ({
  className,
  type = 'button',
  disabled,
  children,
  primary = false,
}) => {
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
