import cn from 'classnames'
import React, { Fragment } from 'react'

import spinner from '../../assets/images/spinner.gif'

import styles from './Spinner.module.scss'

interface Props {
  className?: string
}

export const Spinner: React.FC<Props> = ({ className }) => (
  <Fragment>
    <img src={spinner} alt="Loading..." className={cn(styles.spinner, className)} />
  </Fragment>
)
