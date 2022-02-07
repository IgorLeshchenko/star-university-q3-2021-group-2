import React from 'react'

import { IDropdown } from '../../models/Dropdown'

import classes from './Dropdown.module.scss'

export const Dropdown: React.FC<IDropdown> = ({ options, onChange, ...rest }) => {
  return (
    <div className={classes.dropdown}>
      <select className={classes.dropdown__select} {...rest} onChange={onChange}>
        {options.map((option) => (
          <option key={''} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
