import React from 'react'

import styles from './Upload.module.scss'

interface IUpload {
  value: string
  customClass?: string
  handleUpload: (file: File) => void
}

export const Upload: React.FC<React.PropsWithChildren<IUpload>> = ({ value, customClass = '', handleUpload }) => {
  return (
    <label className={`${styles.upload_button} ${customClass}`}>
      <input
        type="file"
        accept="image/*"
        onChange={({ target }) => {
          if (target.files) {
            handleUpload(target.files[0])
          }
        }}
      />
      {value}
    </label>
  )
}
