// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';

// import store from '../store/configureStore.production';

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
}
