import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { resolveProfileImagePath } from '../../API/helpers'
import { UsersService } from '../../API/UsersService'
import { Avatar } from '../../components/Avatar'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { Spinner } from '../../components/Spinner'
import { Table } from '../../components/Table'
import { toasterService } from '../../components/Toast/ToastService'
import { IUser } from '../../models/User'
import { selectUser } from '../../store/selectors/users'
import { UPLOAD_AVATAR_TITLE, SUCCESS_UPLOAD_AVATAR_MESSAGE, ERROR_UPLOAD_AVATAR_MESSAGE } from '../../utils/constants'

import styles from './Profile.module.scss'
import { Upload } from './Upload'

interface IProfile {
  match: {
    params: {
      username: string
    }
  }
}

export const Profile: React.FC<React.PropsWithChildren<IProfile>> = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<IUser>({})
  const [loading, setLoading] = useState(true)
  const [avatarToggle, setAvatarToggle] = useState(true)
  const [isNotFound, setNotFound] = useState(false)
  const { username } = match.params
  const colNames = ['post', 'upvotes', 'date']

  const authorizedUser = useSelector(selectUser)
  const getUser = async (username: string) => {
    try {
      setNotFound(false)
      setLoading(true)
      const response = await UsersService.getUserPublicData(username)
      setUser(response.data)
    } catch (error) {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }
  const uploadUserAvatar = async (avatar: File): Promise<void> => {
    try {
      await UsersService.setUserIcon(username, avatar)
      setAvatarToggle(!avatarToggle)
      toasterService.success({ title: UPLOAD_AVATAR_TITLE, content: SUCCESS_UPLOAD_AVATAR_MESSAGE })
    } catch (error) {
      toasterService.error({ title: UPLOAD_AVATAR_TITLE, content: ERROR_UPLOAD_AVATAR_MESSAGE })
    }
  }

  const modalHandler = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getUser(username)
  }, [username, avatarToggle])
  const { loggedIn, username: authorizedLogin } = authorizedUser

  const isPageOwner = username === authorizedLogin

  const { numberOfPosts, reputation } = user

  return (
    <React.Fragment>
      <Header />
      <Container data-testid="profile-page">
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.profile}>
            <p className={styles.profile_title}>Profile</p>
            {isNotFound ? (
              <div>Not Found user with username: {username}</div>
            ) : (
              <div>
                <div className={styles.profile_content}>
                  <div className={styles.profile_media}>
                    <Avatar imageUrl={resolveProfileImagePath(username)} customClass={styles.profile_avatar} />
                    {loggedIn && isPageOwner && <Upload value="Change photo" handleUpload={uploadUserAvatar} />}
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.username}>{username}</p>
                    <p className={styles.post_count} onClick={modalHandler}>
                      Posts list: {numberOfPosts}
                    </p>
                    <p className={styles.reputation}>Reputation: {reputation}</p>
                  </div>
                </div>
                {isOpen && <Table onCrossBtnHandler={modalHandler} colNames={colNames} user={username} pageSize={5} />}
              </div>
            )}
          </div>
        )}
      </Container>
    </React.Fragment>
  )
}
