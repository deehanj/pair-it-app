const SET_FILE_DIR = 'SET_FILE_DIR'
const LOAD_FILES = 'LOAD_FILES'

const initialState = {
  dir: '',
  files: []
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    
    case SET_FILE_DIR:
      newState.dir = action.dir
      break
    case LOAD_FILES:
    console.log('reducer files:', Array.isArray(action.files));
      
      newState.files = action.files
      break
    default:
      return state
  }
  return newState
}

export const setFileDir = dir => ({
  type: SET_FILE_DIR, dir
})

export const loadFiles = (files) => ({
  type: LOAD_FILES, files
})


export default reducer