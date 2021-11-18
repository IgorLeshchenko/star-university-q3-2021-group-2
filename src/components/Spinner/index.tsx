import cn from 'classnames'
import React, { Fragment } from 'react'

import styles from './Spinner.module.scss'

interface Props {
  className?: string
}

export const Spinner: React.FC<Props> = ({ className }) => (
  <Fragment>
    <div className={styles.loader}></div>
  </Fragment>
)
