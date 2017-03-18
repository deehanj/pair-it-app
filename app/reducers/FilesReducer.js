import { readFile } from '../utils/FileSystemFunction'

const SET_FILE_DIR = 'SET_FILE_DIR'
const LOAD_FILES = 'LOAD_FILES'
const FILE_ACTIVE = 'FILE_ACTIVE'

const initialState = {
  dir: '',
  files: [],
  activeFile: {}
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

// export const fetchActiveFile = dir => {
//   console.log('I AM FETCHING, JUST RELAX DUDE')
//   readFile(dir)
//   .then(text => {
//     dispatch(activeFile({ filePath: dir, text }))
//   })
//   .catch(error => console.error(error.message))
// }

export default reducer
