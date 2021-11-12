import React from 'react'

import spinner from '../../assets/images/default-avatar.webp'

import styles from './Avatar.module.scss'

interface IAvatar {
  imageUrl: string
  isSmall?: boolean
  customClass?: string
}

export const Avatar: React.FC<React.PropsWithChildren<IAvatar>> = React.memo(
  ({ imageUrl, customClass = '', isSmall }) => {
    const classList = isSmall ? `${styles.avatar} ${styles.avatar_small}` : `${styles.avatar} ` + customClass

    return (
      <img
        src={imageUrl}
        alt="avatar"
        className={classList}
        onError={(event) => {
          const targetImg = event.target as HTMLImageElement
          targetImg.src = spinner
        }}
      />
    )
  },
)

Avatar.displayName = 'Avatar'
