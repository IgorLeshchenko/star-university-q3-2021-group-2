import _ from 'lodash'
import React, { useEffect, useState } from 'react'

import arrowUp from '../../assets/images/arrow-up.svg'
import { Button } from '../Button'

import styles from './ScrollToTop.module.scss'

const Index: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const delay = 300
  const delayedEvent = _.debounce(toggleVisibility, delay)
  window.addEventListener('scroll', delayedEvent)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', delayedEvent)
    }
  }, [])

  return (
    <div className={styles.scroll_container}>
      {isVisible && (
        <Button onClick={scrollToTop} primary={true} className={styles.scroll_button}>
          <img src={arrowUp} alt="arrow-up" />
        </Button>
      )}
    </div>
  )
}

export const ScrollToTop = React.memo(Index)
