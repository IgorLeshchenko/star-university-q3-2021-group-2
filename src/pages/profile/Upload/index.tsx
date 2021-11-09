import React from 'react'

import styles from './Upload.module.scss'

interface IUpload {
  value: string
  customClass?: string
}

export const Upload: React.FC<React.PropsWithChildren<IUpload>> = ({ value, customClass = '' }) => {
  return (
    <label className={`${styles.upload_button} ${customClass}`}>
      <input type="file" />
      {value}
    </label>
  )
}
