// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePageContainer';
import RepoListContainer from './containers/RepoListContainer'
import CollaboratorsContainer from './containers/CollaboratorsContainer'
import login from './components/login';
import store from './store/configureStore';
import axios from 'axios'

export default (
  <Route path="/" component={App} >
    <Route path="/login" component={login} />
    <Route path="/repos" component={RepoListContainer}/>
    <Route path="/collaborators" component={CollaboratorsContainer}/>
    <Route path="/home" component={HomePage} />
    <IndexRoute component={login} />
  </Route>
);
