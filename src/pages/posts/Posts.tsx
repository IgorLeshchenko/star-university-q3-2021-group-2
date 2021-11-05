import React, { useState } from 'react'

import { Button } from '../../components/Button'
import { ErrorModal } from '../../components/ErrorModal'
import { Header } from '../../components/Header'

import styles from './Posts.module.scss'

export const Posts = () => {
  const [isOpen, setIsOpen] = useState(false)

  const modalHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <Header />
      <div className={styles.Posts}>
        Forum page <br />
        <Button primary={true} onClick={modalHandler}>
          Error modal
        </Button>
      </div>
      {isOpen && <ErrorModal onCrossBtnHandler={modalHandler} />}
    </React.Fragment>
  )
}
