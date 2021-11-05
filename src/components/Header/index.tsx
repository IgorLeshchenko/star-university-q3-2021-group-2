import cn from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import { ROUTES } from '../../utils/constants'
import { Container } from '../Container'

import styles from './Header.module.scss'
import { Logo } from './Logo'
import { ProfileDropdown } from './ProfileDropdown'

interface Props {
  isLoginPage?: boolean
  isSignupPage?: boolean
}

export const Header: React.FC<Props> = React.memo(({ isLoginPage = false, isSignupPage = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  // to change on useSelector after store creation
  const isLoggedIn = false
  const mobileMenuHandler = () => setIsOpen((prevState) => !prevState)

  return (
    <header className={styles.header}>
      <Container customClass={styles['header__container']}>
        <React.Fragment>
          <Logo img={logoImg} />
          <div className={`${styles['header__content']} ${isOpen ? styles.active : ''}`}>
            <nav className={styles['header__nav']}>
              <Link to={ROUTES.POSTS} className={styles['header__link']}>
                Posts
              </Link>
              {!isLoginPage && (
                <Link to={ROUTES.LOGIN} className={cn(styles['header__link'], styles['header__link--light'])}>
                  Log in
                </Link>
              )}
              {!isSignupPage && (
                <Link to={ROUTES.SIGN_UP} className={cn(styles['header__link'], styles['header__link--light'])}>
                  Sign up
                </Link>
              )}
            </nav>
            {isLoggedIn && <ProfileDropdown name="John Doe" />}
          </div>
          <div
            className={`${styles['header__cross-btn']} ${isOpen ? styles.active : ''}`}
            onClick={mobileMenuHandler}
          ></div>
        </React.Fragment>
      </Container>
    </header>
  )
})

Header.displayName = 'Header'
