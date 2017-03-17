// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'

const rootReducer = combineReducers({
  routing,
  fileSystem: files
});

export default rootReducer;
