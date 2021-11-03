import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import classes from './App.module.scss'
import Header from './components/Header'
import { Routes } from './constants/routes'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import Posts from './pages/posts/Posts'
import Profile from './pages/profile/Profile'
import SignUp from './pages/sign-up/SignUp'
import SinglePost from './pages/single-post/SinglePost'

function App() {
  return (
    <HashRouter>
      <div className={classes.appContainer}>
        <Header />
        <div className={classes.appContainer__data}>
          <Switch>
            <Route exact={true} path={Routes.POSTS} component={Posts} />
            <Route path={Routes.SIGN_UP} component={SignUp} />
            <Route path={Routes.LOGIN} component={Login} />
            <Route path={Routes.SINGLE_POST} component={SinglePost} />
            <Route path={Routes.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
