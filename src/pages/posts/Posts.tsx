import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Post } from '../../components/post'
import { ScrollToTop } from '../../components/ScrollToTop'
import { Spinner } from '../../components/Spinner'
import { Typography } from '../../components/Typography'
import { loadPagesNumber, loadPostsList, setCurrentPage } from '../../store/postsSlice'
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
  }, [])

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
          <Button primary className={classes.forum__buttonForCreatingPost__button}>
            + Create post
          </Button>
        </div>
      </div>
      <ScrollToTop />
    </React.Fragment>
  )
}
