import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../../components/Button'
import Post from '../../../components/post'
import { Spinner } from '../../../components/Spinner'
import { Typography } from '../../../components/Typography'
import { clearPostsData, loadPostsList } from '../../../store/postsSlice'
import { selectIsLoading, selectPosts } from '../../../store/selectors/posts'
import { POSTS_PER_PAGE } from '../../../utils/constants'
import { TEXT_VARIANTS } from '../../../utils/enums'

import styles from './CommentsList.module.scss'
interface CommentProps {
  id: string
}
const CommentsList: React.FC<CommentProps> = ({ id }) => {
  const postsList = useSelector(selectPosts)
  const isLoading = useSelector(selectIsLoading)
  const [page, setPage] = useState<number>(1)
  const slicedPosts = postsList.slice(0, page * POSTS_PER_PAGE)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsList({ parent: id }))
    return () => {
      dispatch(clearPostsData())
    }
  }, [id])

  const handleLoadingComments = () => {
    setPage((prevState) => prevState + 1)
  }
  return (
    <React.Fragment>
      <div className={styles.divider}></div>
      {isLoading && <Spinner />}
      {!postsList.length && !isLoading && <Typography variant={TEXT_VARIANTS.H1}>No comments yet</Typography>}
      {slicedPosts.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          author={post.author}
          body={post.body}
          date={post.date}
          upvotes={post.upvotes}
          _id={post._id}
          isComment={true}
        />
      ))}
      {slicedPosts.length < postsList.length && !isLoading && (
        <div className={styles.seeMoreButton}>
          <Button primary={false} onClick={handleLoadingComments}>
            See more
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default CommentsList
