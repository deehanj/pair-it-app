// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import store from './store/configureStore';
import axios from 'axios'

import AppContainer from './containers/AppContainer';
import HomePageContainer from './containers/HomePageContainer';
import RepoListContainer from './containers/RepoListContainer'
import CollaboratorsContainer from './containers/CollaboratorsContainer'
import LoginComponent from './components/LoginComponent';

export default (
  <Route path="/" component={AppContainer} >
    <Route path="/LoginComponent" component={LoginComponent} />
    <Route path="/repos" component={RepoListContainer}/>
    <Route path="/collaborators" component={CollaboratorsContainer}/>
    <Route path="/home" component={HomePageContainer} />
    <IndexRoute component={LoginComponent} />
  </Route>
);
