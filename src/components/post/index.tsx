import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { resolveProfileImagePath } from '../../API/helpers'
import { ReactComponent as Comments } from '../../assets/images/Comments.svg'
import { ReactComponent as Downvote } from '../../assets/images/Downvote.svg'
import { ReactComponent as Upvote } from '../../assets/images/Upvote.svg'
import { ISinglePost } from '../../models/SinglePostResult'
import { updatePostReaction } from '../../store/postsSlice'
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
  isComment,
}) => {
  const postDate = new Date(date).toLocaleDateString('en-US')
  const dispatch = useDispatch()

  const { loggedIn } = useSelector(selectUser)
  const { downvotes, upvotes } = useSelector(selectUserReactions)

  const [isBtnClick, setBtnClick] = useState(false)
  const [reaction, setReaction] = useState<REACTIONS>(REACTIONS.UNSELECTED)
  const [updatedUpvotes, setUpdatedUpvotes] = useState(postUpvotes)

  const handleVoteBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!loggedIn) return

    const newReaction = e.currentTarget.id === 'upvote' ? REACTIONS.UPVOTE : REACTIONS.DOWNVOTE
    setBtnClick(true)

    //set reaction
    if (reaction === REACTIONS.UNSELECTED) {
      setReaction(newReaction)
      setUpdatedUpvotes((prevState) => prevState + newReaction)
    } else if (reaction === newReaction) {
      //remove reaction
      setReaction(REACTIONS.UNSELECTED)
      setUpdatedUpvotes((prevState) => prevState - newReaction)
    } else if (reaction !== newReaction) {
      //change to opposite
      setReaction(newReaction)
      setUpdatedUpvotes((prevState) => prevState - reaction + newReaction)
    }
  }

  useEffect(() => {
    isBtnClick && dispatch(updatePostReaction(_id, reaction))
  }, [reaction])

  useEffect(() => {
    if (upvotes && upvotes[_id]) setReaction(REACTIONS.UPVOTE)
    if (downvotes && downvotes[_id]) setReaction(REACTIONS.DOWNVOTE)
  }, [downvotes, upvotes])

  useEffect(() => {
    if (!loggedIn) {
      setReaction(REACTIONS.UNSELECTED)
      setBtnClick(false)
    }
  }, [loggedIn])

  const postStyle = isFullPost
    ? `${styles.post} ${styles.post__full}`
    : isComment
    ? `${styles.post} ${styles.post__comment}`
    : styles.post

  return (
    <div className={styles.container}>
      <article className={postStyle}>
        <div className={styles.post__flex}>
          <div className={styles['post__author-center']}>
            <div>
              <Link to={`${ROUTES.PROFILE}/${author}`}>
                <Avatar imageUrl={resolveProfileImagePath(author)} isSmall={true} />{' '}
              </Link>
            </div>
            <div className={styles['post__author-wrap-color']}>
              {!isComment && <span>posted by </span>}
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
          {!isFullPost && !isComment && (
            <Link to={`${ROUTES.ALL_POST}/${_id}`} className={styles.post__seemore}>
              see more
            </Link>
          )}
        </div>
        <div className={styles['post__bottom--flex']}>
          <div className={styles['post__bottom--center']}>
            <button className={styles.button__upvotes} onClick={handleVoteBtnClick} id="upvote">
              <Upvote
                className={cn(styles['vote-btn'], styles['upvote-btn'], {
                  [styles['active-upvote']]: reaction === REACTIONS.UPVOTE,
                })}
              />
            </button>
            <span className={styles['post__bottom-upvotes--padding']}>{updatedUpvotes}</span>
            <button className={styles.button__upvotes} onClick={handleVoteBtnClick} id="downvote">
              <Downvote
                className={cn(styles['vote-btn'], styles['downvote-btn'], {
                  [styles['active-downvote']]: reaction === REACTIONS.DOWNVOTE,
                })}
              />
            </button>
          </div>
          {!isComment && (
            <Link to={`${ROUTES.ALL_POST}/${_id}`} className={styles['post__bottom-comments']}>
              <Comments />
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}

export default React.memo(Post)
