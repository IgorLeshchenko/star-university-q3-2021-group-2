import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import classes from './App.module.scss'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/not-found/NotFound'
import { Posts } from './pages/posts/Posts'
import { Profile } from './pages/profile/Profile'
import { SignUp } from './pages/sign-up/SignUp'
import { SinglePost } from './pages/single-post/SinglePost'
import { ROUTES } from './utils/constants'

const App = () => {
  return (
    <HashRouter>
      <div className={classes.appContainer}>
        <div className={classes.appContainer__data}>
          <Switch>
            <Route exact path={ROUTES.POSTS} component={Posts} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SINGLE_POST} component={SinglePost} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
