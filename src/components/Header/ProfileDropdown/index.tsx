import cn from 'classnames'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { AuthService } from '../../../API/AuthService'
import { resolveProfileImagePath } from '../../../API/helpers'
import selfie from '../../../assets/images/selfie.svg'
import signOut from '../../../assets/images/sign-out.svg'
import { logout } from '../../../store/userSlice'
import { DEFAULT_ERROR_MESSAGE, ROUTES } from '../../../utils/constants'
import { Avatar } from '../../Avatar'
import { toasterService } from '../../Toast/ToastService'

import styles from './ProfileDropdown.module.scss'

export const ProfileDropdown: React.FC<{ name: string }> = React.memo(({ name }) => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const profileDropdownHandler = () => setIsOpen((prevState) => !prevState)

  const handleLogout = () => {
    AuthService.logout()
      .then(() => dispatch(logout()))
      .then(() => history.push(ROUTES.POSTS))
      .catch((error) => {
        toasterService.error({
          title: 'Error',
          content: error?.response?.data || DEFAULT_ERROR_MESSAGE,
        })
      })
  }

  return (
    <div className={cn(styles['profile-dropdown'], { [styles['active']]: isOpen })}>
      <button className={styles['profile-dropdown__active-btn']} onClick={profileDropdownHandler}>
        <div className={styles['profile-dropdown__icon']}>
          <Avatar imageUrl={resolveProfileImagePath(name)} isSmall />
        </div>
        <span className={styles['profile-dropdown__name']}>{name}</span>
        <span className={styles['profile-dropdown__arrow']}></span>
      </button>
      <div className={styles['profile-dropdown__content']}>
        <Link to={`${ROUTES.PROFILE}/${name}`} className={styles['profile-dropdown__link']}>
          <span className={styles['profile-dropdown__link-icon']}>
            <img src={selfie} />
          </span>
          Profile
        </Link>
        <button className={styles['profile-dropdown__link']} onClick={handleLogout}>
          <span className={styles['profile-dropdown__link-icon']}>
            <img src={signOut} />
          </span>
          Logout
        </button>
      </div>
    </div>
  )
})

ProfileDropdown.displayName = 'ProfileDropdown'
