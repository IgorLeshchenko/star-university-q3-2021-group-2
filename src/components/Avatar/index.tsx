import React from 'react'

import styles from './Avatar.module.scss'

interface IAvatar {
  imageUrl: string
  isSmall?: boolean
  customClass?: string
}

export const Avatar: React.FC<React.PropsWithChildren<IAvatar>> = ({ imageUrl, customClass = '', isSmall }) => {
  const classList = isSmall ? `${styles.avatar} ${styles.avatar_small}` : `${styles.avatar} ` + customClass

  return <img src={imageUrl} alt="avatar" className={classList} />
}
