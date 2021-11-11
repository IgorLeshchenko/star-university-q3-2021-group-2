import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import { selectUser } from '../../store/selectors/users'
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
  const user = useSelector(selectUser)
  const { loggedIn, username } = user
  const mobileMenuHandler = () => setIsOpen((prevState) => !prevState)

  return (
    <header className={styles.header}>
      <Container customClass={styles['header__container']}>
        <React.Fragment>
          <Logo img={logoImg} />
          <div className={cn(styles['header__content'], { [styles.active]: isOpen })}>
            <nav className={styles['header__nav']}>
              <Link to={ROUTES.POSTS} className={styles['header__link']}>
                Posts
              </Link>
              {!isLoginPage && !loggedIn && (
                <Link to={ROUTES.LOGIN} className={cn(styles['header__link'], styles['header__link--light'])}>
                  Log in
                </Link>
              )}
              {!isSignupPage && !loggedIn && (
                <Link to={ROUTES.SIGN_UP} className={cn(styles['header__link'], styles['header__link--light'])}>
                  Sign up
                </Link>
              )}
            </nav>
            {loggedIn && <ProfileDropdown name={username} />}
          </div>
          <div
            className={cn(styles['header__cross-btn'], { [styles.active]: isOpen })}
            onClick={mobileMenuHandler}
          ></div>
        </React.Fragment>
      </Container>
    </header>
  )
})

Header.displayName = 'Header'
