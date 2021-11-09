import React, { useState, useEffect } from 'react'

import { resolveProfileImagePath } from '../../API/helpers'
import { PublicRequestsService } from '../../API/PublicRequestsService'
import { Avatar } from '../../components/Avatar'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
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
  const { username } = match.params

  const getUser = async (username: string) => {
    const response = await PublicRequestsService.getUserPublicData({ username })
    setUser(response.data)
  }

  useEffect(() => {
    getUser(username)
  }, [])

  /* isAuthorized, authorizedLogin should be taken from Redux state, 
  right now it's created here for testing purposes */
  const isAuthorized = true
  const authorizedLogin = 'testertest'

  const isPageOwner = (): boolean => {
    return username === authorizedLogin
  }

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className={styles.profile}>
          <p className={styles.profile_title}>Profile</p>
          <div className={styles.profile_content}>
            <div className={styles.profile_media}>
              <Avatar imageUrl={resolveProfileImagePath(username)} customClass={styles.profile_avatar} />
              {isAuthorized && isPageOwner() && <Upload value="Change photo" />}
            </div>
            <div className={styles.profile_info}>
              <p className={styles.username}>{username}</p>
              <p className={styles.post_count}>Posts: {user?.numberOfPosts}</p>
              <p className={styles.reputation}>Reputation: {user?.reputation}</p>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}
