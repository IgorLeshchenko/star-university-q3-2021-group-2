import { render, screen } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { act } from 'react-dom/test-utils'
import * as reactRedux from 'react-redux'

import { UsersService } from '../../API/UsersService'

import { Profile } from './Profile'

jest.mock('../../components/Header', () => {
  return {
    Header: () => {
      return <></>
    },
  }
})

const TEST_USER_NAME = 'John'
const TEST_USER_INFO = { numberOfPosts: 3, reputation: 5 }
const NOT_FOUND = 'Not Found user with username:'

describe('Profile Page', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const userServiceMock = jest.spyOn(UsersService, 'getUserPublicData')

  beforeEach(() => {
    useSelectorMock.mockReturnValue({ loggedIn: true, username: TEST_USER_NAME })
  })

  it('should render error message if user data is not found', async () => {
    userServiceMock.mockRejectedValue({ error: 401 })

    await act(async () => {
      render(<Profile match={{ params: { username: TEST_USER_NAME } }} />)
    })

    const notFound = screen.queryByText(`${NOT_FOUND} ${TEST_USER_NAME}`)
    expect(notFound).toBeInTheDocument()
  })

  it('should render user information in case of success response', async () => {
    userServiceMock.mockResolvedValue({ data: TEST_USER_INFO } as AxiosResponse)

    await act(async () => {
      render(<Profile match={{ params: { username: TEST_USER_NAME } }} />)
    })

    const outputElementPosts = screen.queryByText(`Posts: ${TEST_USER_INFO.numberOfPosts}`)
    const outputElementRep = screen.queryByText(`Reputation: ${TEST_USER_INFO.reputation}`)
    const notFound = screen.queryByText(`${NOT_FOUND} ${TEST_USER_NAME}`)
    expect(outputElementPosts).toBeInTheDocument()
    expect(outputElementRep).toBeInTheDocument()
    expect(notFound).not.toBeInTheDocument()
  })

  it('should not display upload photo button if user is not page owner', async () => {
    userServiceMock.mockResolvedValue({ data: TEST_USER_INFO } as AxiosResponse)
    const pageOwnerName = 'Mike'
    const uploadText = 'Change photo'

    await act(async () => {
      render(<Profile match={{ params: { username: pageOwnerName } }} />)
    })

    const uploadButton = screen.queryByText(uploadText)
    expect(uploadButton).not.toBeInTheDocument()
  })

  afterEach(() => {
    userServiceMock.mockClear()
    useSelectorMock.mockClear()
  })
})
