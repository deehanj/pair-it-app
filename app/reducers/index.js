// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'
import AuthReducer from './AuthReducer'
import VideoChatReducer from './VideoChatReducer';
import GitButtonsReducer from './GitButtonReducer'
import UserReducer from './userReducer'
import RepoReducer from './repoReducer'
import RoomReducer from './roomReducer'


const rootReducer = combineReducers({
  routing,
  fileSystem: files,
  VideoChat: VideoChatReducer,
  GitButtons: GitButtonsReducer,
  auth: AuthReducer,
  user: UserReducer,
  repo: RepoReducer,
  room: RoomReducer,
});

export default rootReducer;
