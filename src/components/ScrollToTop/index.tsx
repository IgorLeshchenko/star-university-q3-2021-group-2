import React, { useState } from 'react'

import arrowUp from '../../assets/images/arrow-up.svg'
import { Button } from '../Button'

import styles from './ScrollToTop.module.scss'

export const ScrollToTop: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  window.addEventListener('scroll', toggleVisibility)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.scroll_container}>
      {isVisible && (
        <Button onClick={scrollToTop} primary={true} className={styles.scroll_button}>
          <img src={arrowUp} alt="arrow-up" />
        </Button>
      )}
    </div>
  )
})

ScrollToTop.displayName = 'ScrollToTop'
