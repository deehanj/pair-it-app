// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'
import VideoChatReducer from '../VideoChat/VideoChatReducer';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  fileSystem: files,
  VideoChat: VideoChatReducer,
  auth
});

export default rootReducer;
