// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './FilesReducer'
import VideoChatReducer from '../VideoChat/VideoChatReducer';
import GitButtonsReducer from '../reducers/GitButtonReducer'

const rootReducer = combineReducers({
  routing,
  fileSystem: files,
  VideoChat: VideoChatReducer,
  GitButtons: GitButtonsReducer, 
});

export default rootReducer;
