import React, { useState, useEffect } from 'react'

import { PostsService } from '../../API/PostsService'
import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import Post from '../../components/post'
import { ScrollToTop } from '../../components/ScrollToTop'
import { Spinner } from '../../components/Spinner'
import { ISinglePostResult } from '../../models/SinglePostResult'

import { CommentForm } from './CommentForm'
import CommentsList from './CommentsList'
import styles from './SinglePost.module.scss'

interface IPostPage {
  match: {
    params: {
      id: string
    }
  }
}

export const SinglePost: React.FC<React.PropsWithChildren<IPostPage>> = ({ match }) => {
  const { id } = match.params
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<Partial<ISinglePostResult>>({})
  const [isNotFound, setNotFound] = useState(false)
  const [togglePost, setTogglePost] = useState<boolean>(false)
  const getSinglePost = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      setNotFound(false)
      const response = await PostsService.getSinglePost(id)
      setPost(response.data)
    } catch (err) {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePost = (e: boolean) => {
    setTogglePost(e)
  }

  useEffect(() => {
    getSinglePost(id)
  }, [id, togglePost])

  const { title, body, date, author, upvotes, _id } = post as ISinglePostResult

  return (
    <React.Fragment>
      <Header />
      <Container customClass={styles['post-page_container']}>
        {isNotFound && <div className={styles['post-page_error']}>Not Found Post with id: {id}</div>}
        {loading ? (
          <Spinner />
        ) : (
          !isNotFound && (
            <div className={styles['post-page']}>
              <Post
                title={title}
                body={body}
                date={date}
                author={author}
                upvotes={upvotes}
                _id={_id}
                isFullPost={true}
              />
              <CommentForm id={id} toggleComment={handleTogglePost} />
              <CommentsList id={id} />
            </div>
          )
        )}
        <ScrollToTop />
      </Container>
    </React.Fragment>
  )
}
