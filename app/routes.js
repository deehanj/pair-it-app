// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import login from './components/login';
import store from './store/configureStore';
import axios from 'axios'

export default (
  <Route path="/" component={App} >
    <Route path="/login" compnent={login} />
    <Route path="/home" compnent={HomePage} />
    <IndexRoute component={login} />
  </Route>
);
