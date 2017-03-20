// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import store from './store/configureStore';
import axios from 'axios'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
  </Route>
);
