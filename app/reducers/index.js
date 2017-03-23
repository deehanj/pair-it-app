// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'
import auth from './auth'
import VideoChatReducer from '../VideoChat/VideoChatReducer';
import GitButtonsReducer from '../reducers/GitButtonReducer'
import user from './user'
import repo from './repo'


const rootReducer = combineReducers({
  routing,
  fileSystem: files,
  VideoChat: VideoChatReducer,
  GitButtons: GitButtonsReducer, 
  auth,
  user,
  repo
});

export default rootReducer;
