import React, { useState, useEffect } from 'react'

import { resolveProfileImagePath } from '../../API/helpers'
import { UsersService } from '../../API/UsersService'
import { Avatar } from '../../components/Avatar'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { Spinner } from '../../components/Spinner'
import { IUser } from '../../models/User'

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
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNotFound, setNotFound] = useState(false)
  const { username } = match.params

  const getUser = async (username: string) => {
    try {
      setLoading(true)
      const response = await UsersService.getUserPublicData(username)
      console.log(response.data)
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

  /* isAuthorized, authorizedLogin should be taken from Redux state, 
  right now it's created here for testing purposes */
  const isAuthorized = true
  const authorizedLogin = 'testertest'

  const isPageOwner = username === authorizedLogin
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
                  {isAuthorized && isPageOwner && <Upload value="Change photo" />}
                </div>
                <div className={styles.profile_info}>
                  <p className={styles.username}>{username}</p>
                  <p className={styles.post_count}>Posts: {user?.numberOfPosts}</p>
                  <p className={styles.reputation}>Reputation: {user?.reputation}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </React.Fragment>
  )
}
