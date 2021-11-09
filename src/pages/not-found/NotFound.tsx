import React from 'react'
import { Link } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Typography } from '../../components/Typography'
import { ROUTES } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'

import styles from './NotFound.module.scss'

export const NotFound = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.notFound} data-testid="not-found-page">
        <div className={styles.notFound__container}>
          <Typography variant={TEXT_VARIANTS.H1}>404 page</Typography>
          <Typography variant={TEXT_VARIANTS.H2} className={styles.notFound__container__subtitle}>
            This page does not exist 😔
          </Typography>
          <Link to={ROUTES.POSTS} className={styles.notFound__container__link} data-testid="posts-link-text">
            Back to posts
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
