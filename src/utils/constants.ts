export const API_URL = 'https://starforum.herokuapp.com/api/v1'

export const ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  POSTS: '/',
  ALL_POST: '/posts',
  SINGLE_POST: '/posts/:id',
  USER_PROFILE: '/profile/:username',
  PROFILE: '/profile',
}

//toast messages
export const DEFAULT_ERROR_TITLE = 'Error'
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong'
export const DEFAULT_SUCCESS_TITLE = 'Success'
export const SUCCESS_LOGOUT_MESSAGE = 'You are logged out'
export const UPLOAD_AVATAR_TITLE = 'Change photo'
export const SUCCESS_UPLOAD_AVATAR_MESSAGE = 'Photo uploaded successfully'
export const ERROR_UPLOAD_AVATAR_MESSAGE = 'Failed to upload photo'
export const SUCCESS_POST_CREATION_MESSAGE = 'Post uploaded:)'
export const SUCCESS_COMMENT_CREATION_MESSAGE = 'Comment was added'

export const POSTS_PER_PAGE = 10

export const DEFAULT_TOAST_DURATION = 3000 // 3 seconds

export const REFRESH_TOKEN_DURATION = 15 * 60 * 1000 // 15 minutes
