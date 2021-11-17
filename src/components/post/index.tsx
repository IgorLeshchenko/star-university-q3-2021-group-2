import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { resolveProfileImagePath } from '../../API/helpers'
import { PostsService } from '../../API/PostsService'
import { ReactComponent as Comments } from '../../assets/images/Comments.svg'
import { ReactComponent as Downvote } from '../../assets/images/Downvote.svg'
import { ReactComponent as Upvote } from '../../assets/images/Upvote.svg'
import { ISinglePost } from '../../models/SinglePostResult'
import { selectUser } from '../../store/selectors/users'
import { ROUTES, DEFAULT_ERROR_MESSAGE } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'
import { handleError } from '../../utils/helpers'
import { Avatar } from '../Avatar'
import { toasterService } from '../Toast/ToastService'
import { Typography } from '../Typography'

import styles from './Post.module.scss'

const Post: React.FC<React.PropsWithChildren<ISinglePost>> = ({
  author,
  date,
  body,
  title,
  upvotes,
  _id,
  isFullPost,
}) => {
  const [isUpvoted, setUpvoted] = useState(false)
  const [isDownvoted, setDownvoted] = useState(false)
  const [removeReaction, setRemoveReaction] = useState(false)

  const { loggedIn } = useSelector(selectUser)
  const postDate = new Date(date).toLocaleDateString('en-US')

  const changeReactionToOpposite = () => {
    setDownvoted((prevState) => !prevState)
    setUpvoted((prevState) => !prevState)
    setRemoveReaction(true)
  }

  const handleUpvoteClick = () => {
    // should be change after common modal error for forum page
    if (!loggedIn) {
      toasterService.info({
        title: 'In progress',
        content: 'There should be modal with login/signup',
      })
      return
    }

    // change reaction to opposite
    if (isDownvoted && !isUpvoted) changeReactionToOpposite()

    if (isUpvoted) {
      // remove upvote
      setUpvoted((prevState) => !prevState)
      setRemoveReaction(true)
    } else {
      // set upvote
      setUpvoted(true)
    }
  }

  const handleDownvoteClick = () => {
    // should be change after common modal error for forum page
    if (!loggedIn) {
      toasterService.info({
        title: 'In progress',
        content: 'There should be modal with login/signup',
      })
      return
    }

    // change reaction to opposite
    if (isUpvoted && !isDownvoted) changeReactionToOpposite()

    if (isDownvoted) {
      // remove downvote
      setDownvoted((prevState) => !prevState)
      setRemoveReaction(true)
    } else {
      // set downvote
      setDownvoted(true)
    }
  }

  useEffect(() => {
    if (removeReaction) {
      PostsService.removeReaction(_id)
        .then(() => setRemoveReaction(false))
        .catch((error) => {
          handleError(error.response.status, error.response?.data || DEFAULT_ERROR_MESSAGE)
        })
    } else if (isUpvoted) {
      PostsService.upvotePost(_id).catch((error) =>
        handleError(error.response.status, error.response?.data || DEFAULT_ERROR_MESSAGE),
      )
    } else if (isDownvoted) {
      PostsService.downvotePost(_id).catch((error) =>
        handleError(error.response.status, error.response?.data || DEFAULT_ERROR_MESSAGE),
      )
    }
  }, [isDownvoted, isUpvoted, removeReaction])

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
                className={cn(styles['vote-btn'], styles['upvote-btn'], { [styles['active-upvote']]: isUpvoted })}
              />
            </button>
            <span className={styles['post__bottom-upvotes--padding']}>{upvotes}</span>
            <button className={styles.button__upvotes} onClick={handleDownvoteClick}>
              <Downvote
                className={cn(styles['vote-btn'], styles['downvote-btn'], { [styles['active-downvote']]: isDownvoted })}
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
