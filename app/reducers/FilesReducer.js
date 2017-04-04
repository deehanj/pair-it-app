import { getAllFiles, readFile, writeFile } from '../utils/FileSystemFunction'
import * as constants from '../constants/FileSystemConstants'
import Promise from 'bluebird'

const initialState = {
  dir: '',
  files: [],
  activeFile: {
    filePath: '',
    text: ''
  },
  openFiles: [],
  isVisible: {},
  selectedTab: 0
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case constants.WHOLE_FILE:
      newState.openFiles = newState.openFiles.map(file => {
        if(file.filePath === action.file.filePath){
          file.text = action.file.text
        }
        return file;
      })
      break
    case constants.SET_FILE_DIR:
      newState.dir = action.dir
      break
    case constants.LOAD_FILES:
      newState.files = action.files
      break
    case constants.FILE_ACTIVE:
      newState.activeFile = action.file
      break
    case constants.OPEN_FILES:
      newState.openFiles = newState.openFiles.concat([action.file])
      break
    case constants.CLOSE_FILE:
      newState.openFiles = newState.openFiles.filter(file => file.filePath !== action.file.filePath)
      break
    case constants.UPDATE_OPEN_FILES:
      newState.openFiles = newState.openFiles.map(file => {
        if (file.filePath === action.file.filePath) return action.file
        else return file
      })
      break
    case constants.SAVE_NEW_FILE:
      newState.openFiles = newState.openFiles.map(file => {
        if (file.filePath === '') return action.file
        else return file
      })
      break
    case constants.TOGGLE_VISIBILITY:
      newState.isVisible = Object.assign({}, newState.isVisible)
      newState.isVisible[action.filePath] = !newState.isVisible[action.filePath]
      break
    case constants.SWITCH_TAB:
      newState.selectedTab = action.index
      break
    case constants.CLEAR_FILESYSTEM:
      return initialState
    default:
      return state
  }
  return newState
}

export default reducer
