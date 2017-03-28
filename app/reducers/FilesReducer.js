import { getAllFiles, readFile, writeFile } from '../utils/FileSystemFunction'
import Promise from 'bluebird'

const SET_FILE_DIR = 'SET_FILE_DIR'
const LOAD_FILES = 'LOAD_FILES'
const FILE_ACTIVE = 'FILE_ACTIVE'
const OPEN_FILES = 'OPEN_FILES'
const UPDATE_OPEN_FILES = 'UPDATE_OPEN_FILES'
const CLOSE_FILE = 'CLOSE_FILE'
const SAVE_NEW_FILE = 'SAVE_NEW_FILE'

const initialState = {
  dir: '',
  files: [],
  activeFile: {
    filePath: '',
    text: ''
  },
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
      newState.openFiles = newState.openFiles.filter(file => file.filePath !== action.file)
      break
    case UPDATE_OPEN_FILES:
      newState.openFiles = newState.openFiles.map(file => {
        if (file.filePath === action.file.filePath) return action.file
        else return file
      })
      break
    case SAVE_NEW_FILE:
      newState.openFiles = newState.openFiles.map(file => {
        if (file.filePath === '') return action.file
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

export const saveNewFile = file => ({
  type: SAVE_NEW_FILE, file
})

// THUNKS

export const setActiveFileAndReturnFileAndIndex = (file, index) => (dispatch) => {
  dispatch(activeFile(file))
  if (arguments.length > 1) return [file, index]
}

export const addToOpenFilesAndSetActive = () => (dispatch) => {
  dispatch(addToOpenFiles({ filePath: '', text: '' }))
  dispatch(activeFile({ filePath: '', text: '' }))
}

export const setFileDirAndLoadFiles = (dir) => (dispatch) => {
  if (dir.length > 0) {
    getAllFiles(dir + '/')
    .then(result => {
      dispatch(setFileDir(dir))
      dispatch(loadFiles(result))
    })
    .catch(error => console.error(error.message))
  }
}

export const driverSave = (filePath, code, isNewFile) => (dispatch) => {
  return writeFile(filePath, code)
    .then(() => {
      const file = { filePath, text: code }
      if (isNewFile) dispatch(saveNewFile(file))
      dispatch(updateOpenFiles(file))
      return file
    })
    .then(file => dispatch(setActiveFileAndReturnFileAndIndex(file)))
}

export const closeTab = (file, openFiles) => (dispatch) => {
  const oldFileIndex = openFiles.findIndex(openFile => openFile.filePath === file.filePath)
    const length = openFiles.length - 1
    return Promise.resolve(dispatch(closeFile(file)))
    .then(() => {
      let fileToActive;
      let index;
      if (length === 0) {
        fileToActive = { filePath: '', text: '' }
        index = 0
      } else if (oldFileIndex === length) {
        fileToActive = openFiles[length - 1]
        index = length - 1
      }else if (oldFileIndex !== length) {
        fileToActive = openFiles[oldFileIndex + 1]
        index = oldFileIndex
      }
      return dispatch(setActiveFileAndReturnFileAndIndex(fileToActive, index))
    })
}

export default reducer
