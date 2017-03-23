import store from '../store/configureStore.development'

const SET_REPOS = 'SET_REPOS';
const SELECT_REPO = 'SELECT_REPO';

//ACTION CREATOR
export const setRepos = (repoList) => ({
  type: SET_REPOS, repoList
})

export const selectedRepo = (selectedRepo) => ({
	type: SELECT_REPO, selectedRepo
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
  repoList:[],
  selectedRepo: {}
}

export default function reducer( state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_REPOS:
        newState.repoList = action.repoList;
        break;
    case SELECT_REPO:
    	newState.selectedRepo = action.selectedRepo
    	break;
    default:
      return state;
  }

  return newState;

}




