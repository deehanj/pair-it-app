// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import RepoListContainer from './containers/RepoListContainer'
import login from './components/login';
import store from './store/configureStore';
import axios from 'axios'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={login} />
    <Route path="/login" component={login} />
    <Route path="/repos" component={RepoListContainer}/>
    <Route path="/home" component={HomePage} />
  </Route>
);
