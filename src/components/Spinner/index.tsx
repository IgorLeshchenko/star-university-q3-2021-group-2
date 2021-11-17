import React, { Fragment } from 'react'

import styles from './Spinner.module.scss'

export const Spinner = () => (
  <Fragment>
    <div className={styles.loader}></div>
  </Fragment>
)
