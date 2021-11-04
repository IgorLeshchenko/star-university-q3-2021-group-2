import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'

import styles from './Logo.module.scss'

export const Logo: React.FC<{ img: string }> = ({ img }) => {
  return (
    <Link to={ROUTES.POSTS} className={styles.logo}>
      <img src={img} className={styles['logo__img']} />
    </Link>
  )
}
