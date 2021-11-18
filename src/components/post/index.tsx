import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { resolveProfileImagePath } from '../../API/helpers'
import { ReactComponent as Comments } from '../../assets/images/Comments.svg'
import { ReactComponent as Downvote } from '../../assets/images/Downvote.svg'
import { ReactComponent as Upvote } from '../../assets/images/Upvote.svg'
import { ISinglePost } from '../../models/SinglePostResult'
import { downvotePost, removePostReactions, upvotePost } from '../../store/postsSlice'
import { selectUser, selectUserReactions } from '../../store/selectors/users'
import { ROUTES } from '../../utils/constants'
import { REACTIONS, TEXT_VARIANTS } from '../../utils/enums'
import { Avatar } from '../Avatar'
import { Typography } from '../Typography'

import styles from './Post.module.scss'

const Post: React.FC<React.PropsWithChildren<ISinglePost>> = ({
  author,
  date,
  body,
  title,
  upvotes: postUpvotes,
  _id,
  isFullPost,
}) => {
  const postDate = new Date(date).toLocaleDateString('en-US')

  const { loggedIn } = useSelector(selectUser)
  const { downvotes, upvotes } = useSelector(selectUserReactions)

  const [reactions, setReactions] = useState<REACTIONS>(REACTIONS.UNSELECTED)
  const [updatedUpvotes, setUpdatedUpvotes] = useState(postUpvotes)
  const dispatch = useDispatch()

  const handleUpvoteClick = () => {
    if (!loggedIn) return
    if (reactions === REACTIONS.UPVOTE) {
      dispatch(removePostReactions(_id, setUpdatedUpvotes))
      setReactions(REACTIONS.UNSELECTED)
    } else if (reactions === REACTIONS.DOWNVOTE || reactions === REACTIONS.UNSELECTED) {
      dispatch(upvotePost(_id, setUpdatedUpvotes))
      setReactions(REACTIONS.UPVOTE)
    }
  }

  const handleDownVoteClick = () => {
    if (!loggedIn) return
    if (reactions === REACTIONS.DOWNVOTE) {
      dispatch(removePostReactions(_id, setUpdatedUpvotes))
      setReactions(REACTIONS.UNSELECTED)
    } else if (reactions === REACTIONS.UPVOTE || reactions === REACTIONS.UNSELECTED) {
      dispatch(downvotePost(_id, setUpdatedUpvotes))
      setReactions(REACTIONS.DOWNVOTE)
    }
  }

  useEffect(() => {
    if (upvotes && upvotes[_id]) setReactions(REACTIONS.UPVOTE)
    if (downvotes && downvotes[_id]) setReactions(REACTIONS.DOWNVOTE)
  }, [downvotes, upvotes])

  useEffect(() => {
    if (!loggedIn) setReactions(REACTIONS.UNSELECTED)
  }, [loggedIn])

  return (
    <div className={styles.container}>
      <article className={isFullPost ? `${styles.post} ${styles.post__full}` : styles.post}>
        <div className={styles.post__flex}>
          <div className={styles['post__author-center']}>
            <div>
              <Link to={`${ROUTES.PROFILE}/${author}`}>
                <Avatar imageUrl={resolveProfileImagePath(author)} isSmall={true} />{' '}
              </Link>
            </div>
            <div className={styles['post__author-wrap-color']}>
              <span>posted by </span>
              <Link to={`${ROUTES.PROFILE}/${author}`}> {author}</Link>
            </div>
          </div>
          <span className={styles['post__flex-date']}>{postDate}</span>
        </div>
        <div className={styles.post__info}>
          <Typography variant={TEXT_VARIANTS.H2}>
            <Link to={`${ROUTES.ALL_POST}/${_id}`} className={styles.post__title}>
              {title}
            </Link>
          </Typography>
          <p className={styles.post__text}>{body}</p>
          {!isFullPost && (
            <Link to={`${ROUTES.ALL_POST}/${_id}`} className={styles.post__seemore}>
              see more
            </Link>
          )}
        </div>
        <div className={styles['post__bottom--flex']}>
          <div className={styles['post__bottom--center']}>
            <button className={styles.button__upvotes} onClick={handleUpvoteClick}>
              <Upvote
                className={cn(styles['vote-btn'], styles['upvote-btn'], {
                  [styles['active-upvote']]: reactions === REACTIONS.UPVOTE,
                })}
              />
            </button>
            <span className={styles['post__bottom-upvotes--padding']}>{updatedUpvotes}</span>
            <button className={styles.button__upvotes} onClick={handleDownVoteClick}>
              <Downvote
                className={cn(styles['vote-btn'], styles['downvote-btn'], {
                  [styles['active-downvote']]: reactions === REACTIONS.DOWNVOTE,
                })}
              />
            </button>
          </div>
          <Link to={`${ROUTES.ALL_POST}/${_id}`} className={styles['post__bottom-comments']}>
            <Comments />
          </Link>
        </div>
      </article>
    </div>
  )
}

export default React.memo(Post)
