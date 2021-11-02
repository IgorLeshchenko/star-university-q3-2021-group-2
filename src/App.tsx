import React from 'react'
import './App.css'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import Posts from './pages/posts/Posts'
import Profile from './pages/profile/Profile'
import SignUp from './pages/sign-up/SignUp'
import SinglePost from './pages/single-post/SinglePost'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path={'/'} component={Posts} />
        <Route path={'/sign-up'} component={SignUp} />
        <Route path={'/login'} component={Login} />
        <Route path={'/post/:id'} component={SinglePost} />
        <Route path={'/profile'} component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App
