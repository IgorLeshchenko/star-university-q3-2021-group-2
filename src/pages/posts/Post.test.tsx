import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { PostsService } from '../../API/PostsService'
import { ISinglePostResult } from '../../models/SinglePostResult'
import { store } from '../../store/store'

import { Posts } from './Posts'

jest.mock('../../API/PostsService')
jest.mock('../../store/selectors/posts', () => ({
  ...jest.requireActual('../../store/selectors/posts'),
  selectSearchValue: jest.fn(),
}))

describe('given Posts page', () => {
  const post: ISinglePostResult = {
    author: 'test',
    body: 'test',
    date: '2021-11-18T18:28:48.786Z',
    title: 'test',
    upvotes: -1,
    _id: '61969b604467a300045634c7',
  }

  it('should render posts list', async () => {
    const mockedGetPosts = jest.spyOn(PostsService, 'getPosts')
    const mockedGetPostsNumber = jest.spyOn(PostsService, 'getPostsNumber')

    mockedGetPosts.mockResolvedValue({
      data: [
        { ...post, _id: 1 },
        { ...post, _id: 2 },
      ],
    } as AxiosResponse)

    mockedGetPostsNumber.mockResolvedValue({
      data: {
        result: 10,
      },
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <Posts />
        </Router>
      </Provider>,
    )

    await waitFor(async () => {
      const articles = await screen.findAllByRole('article')
      expect(articles).toHaveLength(2)
    })
  })

  it("should render message 'No posts yet' if posts list is empty", async () => {
    const mockedGetPosts = jest.spyOn(PostsService, 'getPosts')
    const mockedGetPostsNumber = jest.spyOn(PostsService, 'getPostsNumber')

    mockedGetPosts.mockResolvedValue({
      data: [],
    } as AxiosResponse)

    mockedGetPostsNumber.mockResolvedValue({
      data: {
        result: 0,
      },
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <Posts />
        </Router>
      </Provider>,
    )

    await waitFor(async () => {
      expect(screen.getByText('No posts yet')).toHaveClass('forum__posts__noPostsMessage')
    })
  })

  it("should render button 'See more' if pages amount more than 1", async () => {
    const mockedGetPosts = jest.spyOn(PostsService, 'getPosts')
    const mockedGetPostsNumber = jest.spyOn(PostsService, 'getPostsNumber')

    mockedGetPosts.mockResolvedValue({
      data: [
        { ...post, _id: 1 },
        { ...post, _id: 2 },
      ],
    } as AxiosResponse)

    mockedGetPostsNumber.mockResolvedValue({
      data: {
        result: 50,
      },
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <Posts />
        </Router>
      </Provider>,
    )

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: /See more/i })).toHaveClass('forum__loadingButton')
    })
  })

  it("should not render button 'See more' if there is only 1 page of posts", async () => {
    const mockedGetPosts = jest.spyOn(PostsService, 'getPosts')
    const mockedGetPostsNumber = jest.spyOn(PostsService, 'getPostsNumber')

    mockedGetPosts.mockResolvedValue({
      data: [
        { ...post, _id: 1 },
        { ...post, _id: 2 },
      ],
    } as AxiosResponse)

    mockedGetPostsNumber.mockResolvedValue({
      data: {
        result: 10,
      },
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <Posts />
        </Router>
      </Provider>,
    )

    await waitFor(async () => {
      expect(screen.queryByRole('button', { name: /See more/i })).toBeNull()
    })
  })

  it('should render posts if search returned not empty list', async () => {
    const mockedGetPosts = jest.spyOn(PostsService, 'getPosts')
    const mockedGetPostsNumber = jest.spyOn(PostsService, 'getPostsNumber')

    mockedGetPosts.mockResolvedValue({
      data: [
        { ...post, _id: 1 },
        { ...post, _id: 2 },
      ],
    } as AxiosResponse)

    mockedGetPostsNumber.mockResolvedValue({
      data: {
        result: 10,
      },
    } as AxiosResponse)

    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <Posts />
        </Router>
      </Provider>,
    )

    const searchField = screen.getByPlaceholderText('Some text')

    await act(async () => {
      fireEvent.change(searchField, { target: { value: 'search for topics' } })
    })

    await waitFor(async () => {
      const articles = await screen.findAllByRole('article')
      expect(articles).toHaveLength(2)
    })
  })
})
