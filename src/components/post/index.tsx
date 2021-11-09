import cn from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Comments } from '../../assets/images/Comments.svg'
import { ReactComponent as Downvote } from '../../assets/images/Downvote.svg'
import { ReactComponent as Upvote } from '../../assets/images/Upvote.svg'
import { ROUTES } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'
import { Typography } from '../Typography'

import styles from './Post.module.scss'

interface IPost {
  author: string
  date: string
  body: string
  title: string
  upvotes: number
  comments?: number
  toggleClass?: React.MouseEventHandler
}

export const Post: React.FC<React.PropsWithChildren<IPost>> = ({ author, date, body, title, upvotes, comments }) => {
  const [isActiveUp, setActiveUp] = useState(false)
  const [isActiveDown, setActiveDown] = useState(false)

  const VoteOnClickUp = () => {
    setActiveUp(!isActiveUp)
  }

  const VoteOnClickDown = () => {
    setActiveDown(!isActiveDown)
  }

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <div className={styles.post__flex}>
          <div>
            <img src="API_URL/username/icon" alt="User Avatar" />
            <span>Post by</span>
            <Link to={ROUTES.PROFILE}> {author}</Link>
          </div>
          <span>{date}</span>
        </div>
        <div className={styles.post__info}>
          <Typography variant={TEXT_VARIANTS.H2}>
            <Link to={ROUTES.SINGLE_POST} className={styles.post__title}>
              {title}
            </Link>
          </Typography>
          <p className={styles.post__text}>{body}</p>
          <Link to={ROUTES.SINGLE_POST} className={styles.post__seemore}>
            see more
          </Link>
        </div>
        <div className={cn(styles['post__bottom--flex'])}>
          <div className={cn(styles['post__bottom--center'])}>
            <button className={styles.button}>
              <Upvote
                className={cn(styles[isActiveUp ? 'active-upvote' : 'nonactive-upvote'])}
                onClick={VoteOnClickUp}
              />
            </button>
            <span className={cn(styles['post__bottom-upvotes--padding'])}>{upvotes}</span>
            <button className={styles.button}>
              <Downvote
                className={cn(styles[isActiveDown ? 'active-downvote' : 'nonactive-downvote'])}
                onClick={VoteOnClickDown}
              />
            </button>
          </div>
          <Link to={ROUTES.SINGLE_POST} className={cn(styles['post__bottom-comments'])}>
            <Comments />
            <span className={cn(styles['post__bottom-comments--padding'])}>{comments}</span>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default Post
