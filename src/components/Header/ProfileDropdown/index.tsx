import cn from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import selfie from '../../../assets/images/selfie.svg'
import signOut from '../../../assets/images/sign-out.svg'
import { ROUTES } from '../../../utils/constants'

import styles from './ProfileDropdown.module.scss'

export const ProfileDropdown: React.FC<{ name: string; img?: string }> = React.memo(({ name, img }) => {
  const [isOpen, setIsOpen] = useState(false)
  const profileDropdownHandler = () => setIsOpen((prevState) => !prevState)

  return (
    <div className={cn(styles['profile-dropdown'], { [styles['active']]: isOpen })}>
      <button className={styles['profile-dropdown__active-btn']} onClick={profileDropdownHandler}>
        <div className={styles['profile-dropdown__icon']}>{img && <img src={img} alt={name} />}</div>
        <span className={styles['profile-dropdown__name']}>{name}</span>
        <span className={styles['profile-dropdown__arrow']}></span>
      </button>
      <div className={styles['profile-dropdown__content']}>
        <Link to={ROUTES.PROFILE} className={styles['profile-dropdown__link']}>
          <span className={styles['profile-dropdown__link-icon']}>
            <img src={selfie} />
          </span>
          Profile
        </Link>
        <button className={styles['profile-dropdown__link']}>
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
