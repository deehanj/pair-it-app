// // @flow
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { hashHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
// import rootReducer from '../reducers';
//
//
// const router = routerMiddleware(hashHistory);
//
// const enhancer = applyMiddleware(thunk, router);
//
// export default function configureStore(initialState) {
//   return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
// }

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
  //   );
  // }

  return store;
}


export default configureStore()
