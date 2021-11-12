import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Post } from '../../components/post'
import { PostCreationModal } from '../../components/PostCreation'
import { ScrollToTop } from '../../components/ScrollToTop'
import { Spinner } from '../../components/Spinner'
import { Typography } from '../../components/Typography'
import { clearPostsData, loadPagesNumber, loadPostsList, setCurrentPage } from '../../store/postsSlice'
import {
  selectCurrentPage,
  selectIsLoading,
  selectPagesAmount,
  selectPosts,
  selectSortType,
} from '../../store/selectors/posts'
import { POSTS_PER_PAGE } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'

import classes from './Posts.module.scss'
import { SearchBar } from './SearchFilterParams'

export const Posts = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const postsList = useSelector(selectPosts)
  const pagesAmount = useSelector(selectPagesAmount)
  const sortType = useSelector(selectSortType)
  const currentPage = useSelector(selectCurrentPage)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(loadPostsList({ page: currentPage, number: POSTS_PER_PAGE, sort: sortType }))
  }, [currentPage, sortType])

  useEffect(() => {
    dispatch(loadPagesNumber())
    return () => {
      dispatch(clearPostsData())
    }
  }, [])

  const modalHandler = () => {
    setIsOpen(!isOpen)
  }

  const handleLoadingPosts = () => dispatch(setCurrentPage(currentPage + 1))

  return (
    <React.Fragment>
      <Header />
      <div className={classes.forum}>
        <div className={classes.forum__searchAndFilterBar}>
          <SearchBar />
        </div>
        <div className={classes.forum__posts}>
          {!postsList.length && !isLoading && (
            <Typography variant={TEXT_VARIANTS.H1} className={classes.forum__posts__noPostsMessage}>
              No posts yet
            </Typography>
          )}
          {postsList.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              author={post.author}
              body={post.body}
              date={post.date}
              upvotes={post.upvotes}
              countChildren={post.children?.length || 0}
              _id={post._id}
              __v={post.__v}
            />
          ))}
          {isLoading && (
            <div className={classes.forum__posts__loadingSpinner}>
              <Spinner />
            </div>
          )}
          {!isLoading && currentPage < pagesAmount && (
            <div className={classes.forum__posts__seeMoreButton}>
              <Button primary onClick={handleLoadingPosts} className={classes.forum__loadingButton}>
                See more
              </Button>
            </div>
          )}
        </div>
        <div className={classes.forum__buttonForCreatingPost}>
          <Button primary className={classes.forum__buttonForCreatingPost__button} onClick={modalHandler}>
            + Create post
          </Button>
        </div>
        {isOpen && <PostCreationModal onCrossBtnHandler={modalHandler} />}
      </div>
      <ScrollToTop />
    </React.Fragment>
  )
}
