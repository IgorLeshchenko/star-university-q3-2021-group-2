import React from 'react'

export interface IOption {
  label: string
  value: string
}

export interface IDropdown {
  options: IOption[]
  onChange: React.ChangeEventHandler
}
