import store from '../store/configureStore.development'

const SET_REPOS = 'SET_REPOS';
const SELECT_REPO = 'SELECT_REPO';
const SET_PAIRING_ROOM = 'SET_PAIRING_ROOM';
const SET_PAIRING_PARTNER = 'SET_PAIRING_PARTNER';
const SET_ROLE = 'SET_ROLE';

//ACTION CREATOR
export const setRepos = (repoList) => ({
  type: SET_REPOS, repoList
})

export const selectedRepo = (selectedRepo) => ({
	type: SELECT_REPO, selectedRepo
})

export const setPairingRoom = (url) => ({
  type: SET_PAIRING_ROOM, url
})

export const setPairingPartner = (collaborator) => ({
  type: SET_PAIRING_ROOM, collaborator
})

export const setRoleToDriver = () => ({
  type: SET_ROLE, role: 'driver'
})

export const setRoleToNavigator = () => ({
  type: SET_ROLE, role: 'navigator'
})

//THUNK

export const setSelectedRepo = (repoId) =>
	(dispatch, getState) => {
		const repos = store.getState().repo.repoList
		const selectedRepoFromList = repos.filter(repo => repo.id === repoId)
		dispatch(selectedRepo(selectedRepoFromList[0]))
	}


// INITIAL STATE
const initialState = {
  repoList: [],
  selectedRepo: {},
  url: '',
  collaborator: {},
  role: ''
}

export default function reducer( state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_REPOS:
        newState.repoList = action.repoList
        break
    case SELECT_REPO:
      newState.selectedRepo = action.selectedRepo
      break
    case SET_PAIRING_ROOM:
      newState.url = action.url
      break
    case SET_PAIRING_PARTNER:
      newState.collaborator = action.collaborator
      break
    case SET_ROLE:
      newState.role = action.role
      break
    default:
      return state
  }

  return newState;

}
