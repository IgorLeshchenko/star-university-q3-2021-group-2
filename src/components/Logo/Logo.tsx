import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '../../constants/routes'

import styles from './Logo.module.scss'

export const Logo: React.FC<{ img: string }> = ({ img }) => {
  return (
    <Link to={Routes.POSTS} className={styles.logo}>
      <img src={img} className={styles['logo__img']} />
    </Link>
  )
}
