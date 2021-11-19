import cn from 'classnames'
import React from 'react'

import styles from './Spinner.module.scss'

interface Props {
  className?: string
}

export const Spinner: React.FC<Props> = ({ className }) => <div className={cn(styles.loader, className)}></div>
