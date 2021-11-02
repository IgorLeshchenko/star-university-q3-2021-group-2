import React from 'react'
import './App.scss'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import { PATHS } from './pages/paths'
import Posts from './pages/posts/Posts'
import Profile from './pages/profile/Profile'
import SignUp from './pages/sign-up/SignUp'
import SinglePost from './pages/single-post/SinglePost'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path={PATHS.POSTS} component={Posts} />
        <Route path={PATHS.SIGN_UP} component={SignUp} />
        <Route path={PATHS.LOGIN} component={Login} />
        <Route path={PATHS.SINGLE_POST} component={SinglePost} />
        <Route path={PATHS.PROFILE} component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App
