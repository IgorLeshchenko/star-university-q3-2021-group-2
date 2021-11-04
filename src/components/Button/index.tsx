import classNames from 'classnames'
import React from 'react'

import { BUTTON_TYPE } from '../../utils/enums'

import classes from './Button.module.scss'

interface IButton {
  className?: string
  type?: BUTTON_TYPE
  disabled?: boolean
  primary?: boolean
}

export const Button: React.FC<React.PropsWithChildren<IButton>> = ({
  className,
  type = BUTTON_TYPE.BUTTON,
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
