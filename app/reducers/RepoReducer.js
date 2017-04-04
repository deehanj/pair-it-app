import * as constants from '../constants/RepoConstants'

// INITIAL STATE
const initialState = {
  repoList: [],
  selectedRepo: {},
  repoCollaborators: [],
  url: '',
  collaborator: {},
  role: ''
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case constants.SET_REPOS:
        newState.repoList = action.repoList
        break
    case constants.SELECT_REPO:
      newState.selectedRepo = action.selectedRepo
      break
    case constants.SET_REPO_COLLABORATORS:
      newState.repoCollaborators = action.repoCollaborators
      break
    case constants.SET_PAIRING_ROOM:
      newState.url = action.url
      break
    case constants.SET_PAIRING_PARTNER:
      newState.collaborator = action.collaborator
      break
    case constants.SET_ROLE:
      newState.role = action.role
      break
    case constants.CLEAR_ROLE:
      newState.role = ''
      break
    case constants.CLEAR_REPOS:
      newState.repoList = []
      break
    default:
      return state
  }
  return newState;
}

export default reducer
