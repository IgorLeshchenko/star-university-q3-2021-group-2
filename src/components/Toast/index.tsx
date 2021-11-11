import React, { useEffect } from 'react'

import successIcon from '../../assets/images/check.svg'
import errorIcon from '../../assets/images/error.svg'
import infoIcon from '../../assets/images/info.svg'
import warningIcon from '../../assets/images/warning.svg'
import { DEFAULT_TOAST_DURATION } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'
import { Typography } from '../Typography'

import styles from './Toast.module.scss'

export interface ToastProps {
  id: string
  destroy: () => void
  title: string
  content: string
  duration?: number
  status?: 'check' | 'error' | 'info' | 'warning'
  backgroundColor?: '#5cb85c' | '#d9534f' | '#5bc0de' | '#f0ad4e'
}

export const Toast: React.FC<ToastProps> = React.memo((props) => {
  const { destroy, title, content, duration = DEFAULT_TOAST_DURATION, status, backgroundColor } = props
  useEffect(() => {
    if (!duration) return

    const timer = setTimeout(() => {
      destroy()
    }, duration)

    return () => clearTimeout(timer)
  }, [destroy, duration])

  const toastIcon =
    status === 'check' ? successIcon : status === 'warning' ? warningIcon : status === 'info' ? infoIcon : errorIcon

  return (
    <div onClick={destroy} style={{ backgroundColor: backgroundColor }} className={styles.toast}>
      <div className={styles.toast_image}>
        <img src={toastIcon} alt={status} width={30} height={30} />
      </div>
      <div className={styles.toast_body}>
        <Typography variant={TEXT_VARIANTS.H3}>{title}</Typography>
        <Typography variant={TEXT_VARIANTS.H4}>{content}</Typography>
      </div>
    </div>
  )
})

Toast.displayName = 'Toast'
