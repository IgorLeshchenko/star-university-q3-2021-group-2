import React from 'react'

import styles from './ProfileDropdown.module.scss'

const ProfileDropdown: React.FC<{ name: string; img: string }> = ({ name, img }) => {
  // const [isOpen, setIsOpen] = useState(false)
  // const profileDropdownHandler = () => setIsOpen((prevState) => !prevState)

  return (
    <div className={styles['profile-dropdown']}>
      <button>
        <img src={img} alt={name} />
        <span>{name}</span>
      </button>
      <div className={`${styles['profile-dropdown']}`}>Profile content</div>
    </div>
  )
}

export default ProfileDropdown
