import classNames from 'classnames'
import React from 'react'

import classes from './TextField.module.scss'

interface ITextField {
  className?: string
  id: string
  name: string
  label: string
  type: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  error?: boolean
  helperText?: string
}

export const TextField: React.FC<ITextField> = ({
  className,
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <div className={classes.textField}>
      <input
        className={classNames(classes.textField__input, className, {
          [classes.textField__input__error]: error,
        })}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        id={id}
        placeholder={label}
      />
      {error && <div className={classes.textField__error}>{helperText}</div>}
    </div>
  )
}
