import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import Container from '../../shared/Container'
import { ROUTES } from '../../utils/constants'
import { Logo } from '../Logo'
import ProfileDropdown from '../ProfileDropdown'

import styles from './Header.module.scss'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const mobileMenuHandler = () => setIsOpen((prevState) => !prevState)

  return (
    <header className={styles.header}>
      <Container customClass={styles['header__container']}>
        <React.Fragment>
          <Logo img={logo} />
          <div className={`${styles['header__content']} ${isOpen ? styles.active : ''}`}>
            <Link to={ROUTES.POSTS} className={styles['header__link']}>
              Posts
            </Link>
            <Link to={ROUTES.LOGIN} className={styles['header__link']}>
              Log in
            </Link>
            <Link to={ROUTES.SIGN_UP} className={styles['header__link']}>
              Sign up
            </Link>
            <ProfileDropdown name="test" img={logo} />
          </div>
          <div
            className={`${styles['header__cross-btn']} ${isOpen ? styles.active : ''}`}
            onClick={mobileMenuHandler}
          ></div>
        </React.Fragment>
      </Container>
    </header>
  )
}

export default Header
