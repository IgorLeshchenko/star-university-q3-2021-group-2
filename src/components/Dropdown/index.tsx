import React from 'react'

import { IDropdown } from '../../models/Dropdown'

import classes from './Dropdown.module.scss'

export const Dropdown: React.FC<IDropdown> = ({ options, onChange }) => {
  return (
    <div className={classes.dropdown}>
      <select className={classes.dropdown__select} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
