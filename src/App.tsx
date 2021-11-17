import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { api } from './API'
import classes from './App.module.scss'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/not-found/NotFound'
import { Posts } from './pages/posts/Posts'
import { Profile } from './pages/profile/Profile'
import { SignUp } from './pages/sign-up/SignUp'
import { SinglePost } from './pages/single-post/SinglePost'
import { API_URL, REFRESH_TOKEN_DURATION, ROUTES } from './utils/constants'

export const AppRouting = () => (
  <Switch>
    <Route exact path={ROUTES.POSTS} component={Posts} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.SINGLE_POST} component={SinglePost} />
    <Route path={ROUTES.USER_PROFILE} component={Profile} />
    <Route component={NotFound} />
  </Switch>
)

const App = () => {
  // Refresh access token every 15 minutes
  useEffect(() => {
    setInterval(async () => {
      const token = await api.get(`${API_URL}/token`)
      await Cookies.set('accessToken', token.headers['accesstoken'])
    }, REFRESH_TOKEN_DURATION)
  }, [])
  return (
    <HashRouter>
      <div className={classes.appContainer}>
        <div className={classes.appContainer__data}>
          <AppRouting />
        </div>
      </div>
    </HashRouter>
  )
}

export default App
