// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'
import auth from './auth'
import VideoChatReducer from './VideoChatReducer';
import GitButtonsReducer from './GitButtonReducer'
import user from './user'
import repo from './repo'
import room from './room'


const rootReducer = combineReducers({
  routing,
  fileSystem: files,
  VideoChat: VideoChatReducer,
  GitButtons: GitButtonsReducer,
  auth,
  user,
  repo,
  room
});

export default rootReducer;
