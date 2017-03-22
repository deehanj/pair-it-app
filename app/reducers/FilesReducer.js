import { readFile } from '../utils/FileSystemFunction'

const SET_FILE_DIR = 'SET_FILE_DIR'
const LOAD_FILES = 'LOAD_FILES'
const FILE_ACTIVE = 'FILE_ACTIVE'
const OPEN_FILES = 'OPEN_FILES'
const UPDATE_OPEN_FILES = 'UPDATE_OPEN_FILES'
const CLOSE_FILE = 'CLOSE_FILE'

const initialState = {
  dir: '',
  files: [],
  activeFile: {},
  openFiles: []
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_FILE_DIR:
      newState.dir = action.dir
      break
    case LOAD_FILES:
      newState.files = action.files
      break
    case FILE_ACTIVE:
      newState.activeFile = action.file
      break
    case OPEN_FILES:
      newState.openFiles = newState.openFiles.concat([action.file])
      break
    case CLOSE_FILE:
      newState.openFiles = newState.openFiles.filter(file => file.filePath !== action.file.filePath)
      break
    case UPDATE_OPEN_FILES:
      newState.openFiles = newState.openFiles.map(file => {
        if (file.filePath === action.file.filePath) return action.file
        else return file
      })
      break
    default:
      return state
  }
  return newState
}

export const setFileDir = dir => ({
  type: SET_FILE_DIR, dir
})

export const loadFiles = files => ({
  type: LOAD_FILES, files
})

export const activeFile = file => ({
  type: FILE_ACTIVE, file
})

export const addToOpenFiles = file => ({
  type: OPEN_FILES, file
})

export const updateOpenFiles = file => ({
  type: UPDATE_OPEN_FILES, file
})

export const closeFile = file => ({
  type: CLOSE_FILE, file
})

export default reducer
