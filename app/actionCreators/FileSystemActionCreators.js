import Promise from 'bluebird'

import * as constants from '../constants/FileSystemConstants'
import { getAllFiles, readFile, writeFile } from '../utils/FileSystemFunction'

export const setFileDir = dir => ({
  type: constants.SET_FILE_DIR, dir
})

export const loadFiles = files => ({
  type: constants.LOAD_FILES, files
})

export const activeFile = file => ({
  type: constants.FILE_ACTIVE, file
})

export const addToOpenFiles = file => ({
  type: constants.OPEN_FILES, file
})

export const updateOpenFiles = file => ({
  type: constants.UPDATE_OPEN_FILES, file
})

export const closeFile = file => ({
  type: constants.CLOSE_FILE, file
})

export const saveNewFile = file => ({
  type: constants.SAVE_NEW_FILE, file
})

export const toggleVisibility = filePath => ({
  type: constants.TOGGLE_VISIBILITY, filePath
})

export const switchTab = index => ({
  type: constants.SWITCH_TAB, index
})

export const wholeFile = file => ({
  type: constants.WHOLE_FILE, file
})

export const clearFileSystem = () => ({
  type: constants.CLEAR_FILESYSTEM
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
