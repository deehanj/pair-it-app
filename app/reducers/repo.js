// import store from '../store/configureStore.development'
// import { apiRequestAuth } from '../utils/api-requests';

const SET_REPOS = 'SET_REPOS';
const SELECT_REPO = 'SELECT_REPO';
const SET_REPO_COLLABORATORS = 'SET_REPO_COLLABORATORS';
const SET_PAIRING_ROOM = 'SET_PAIRING_ROOM';
const SET_PAIRING_PARTNER = 'SET_PAIRING_PARTNER';
const SET_ROLE = 'SET_ROLE';
const CLEAR_ROLE = 'CLEAR_ROLE';
const CLEAR_REPOS = 'CLEAR_REPOS';

//ACTION CREATOR
export const setRepos = (repoList) => ({
  type: SET_REPOS, repoList
})

export const selectedRepo = (selectedRepo) => ({
	type: SELECT_REPO, selectedRepo
})

export const setRepoCollaborators = (repoCollaborators) => ({
  type: SET_REPO_COLLABORATORS, repoCollaborators
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

export const clearRole = () => ({
  type: CLEAR_ROLE
})

export const clearRepos = () => ({
  type: CLEAR_REPOS
})

//THUNK

export const setSelectedRepo = (repoId) =>
	(dispatch, getState) => {
    const state = getState()
		const repos = state.repo.repoList
		const selectedRepoFromList = repos.filter(repo => repo.id === repoId)
		dispatch(selectedRepo(selectedRepoFromList[0]))

    // const method = 'GET'
    // const url = selectedRepoFromList[0].collaborators_url.slice(0, -15)
    // const token = state.auth.token
    //
    // if (selectedRepoFromList){
    //   return apiRequestAuth(url, method, token)
    //     .then( response => {
    //             dispatch(setRepoCollaborators(response.data))
    //           }
    //           )
    //     .catch(function (error) {
    //       console.error('Selected Repo Collaborators Error', error);
    //     });
    // }
	}


// INITIAL STATE
const initialState = {
  repoList: [],
  selectedRepo: {},
  repoCollaborators: [],
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
    case SET_REPO_COLLABORATORS:
      newState.repoCollaborators = action.repoCollaborators
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
    case CLEAR_ROLE:
      newState.role = ''
      break
    case CLEAR_REPOS:
      newState.repoList = []
      break
    default:
      return state
  }

  return newState;

}
