import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { resolveProfileImagePath } from '../../API/helpers'
import { UsersService } from '../../API/UsersService'
import { Avatar } from '../../components/Avatar'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { Spinner } from '../../components/Spinner'
import { IUser } from '../../models/User'

import styles from './Profile.module.scss'
import { Upload } from './Upload'

interface IUserInfo {
  user: { username: string; loggedIn: boolean }
}

interface IProfile {
  match: {
    params: {
      username: string
    }
  }
  authorizedUser: IUserInfo
}
export const Profile: React.FC<React.PropsWithChildren<IProfile>> = ({ match }) => {
  const [user, setUser] = useState<IUser>({})
  const [loading, setLoading] = useState(true)
  const [isNotFound, setNotFound] = useState(false)
  const { username } = match.params

  const getUser = async (username: string) => {
    try {
      setNotFound(false)
      setLoading(true)
      const response = await UsersService.getUserPublicData(username)
      setUser(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setNotFound(true)
    }
  }

  useEffect(() => {
    getUser(username)
  }, [username])

  const authorizedUser = useSelector((state: { user: IUserInfo }) => state.user.user)

  const { loggedIn, username: authorizedLogin } = authorizedUser

  const isPageOwner = username === authorizedLogin

  const { numberOfPosts, reputation } = user

  return (
    <React.Fragment>
      <Header />
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.profile}>
            <p className={styles.profile_title}>Profile</p>
            {isNotFound ? (
              <div>Not Found user with username: {username}</div>
            ) : (
              <div className={styles.profile_content}>
                <div className={styles.profile_media}>
                  <Avatar imageUrl={resolveProfileImagePath(username)} customClass={styles.profile_avatar} />
                  {loggedIn && isPageOwner && <Upload value="Change photo" />}
                </div>
                <div className={styles.profile_info}>
                  <p className={styles.username}>{username}</p>
                  <p className={styles.post_count}>Posts: {numberOfPosts}</p>
                  <p className={styles.reputation}>Reputation: {reputation}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </React.Fragment>
  )
}
