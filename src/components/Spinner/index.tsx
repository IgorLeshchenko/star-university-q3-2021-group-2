import React, { Fragment } from 'react'

import spinner from '../../assets/images/spinner.gif'

import styles from './Spinner.module.scss'

export const Spinner = () => (
  <Fragment>
    <img src={spinner} alt="Loading..." className={styles.spinner} />
  </Fragment>
)
