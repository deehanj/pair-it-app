import * as constants from '../constants/RepoConstants'

export const setRepos = (repoList) => ({
  type: constants.SET_REPOS, repoList
})

export const selectedRepo = (selectedRepo) => ({
	type: constants.SELECT_REPO, selectedRepo
})

export const setRepoCollaborators = (repoCollaborators) => ({
  type: constants.SET_REPO_COLLABORATORS, repoCollaborators
})

export const setPairingRoom = (url) => ({
  type: constants.SET_PAIRING_ROOM, url
})

export const setPairingPartner = (collaborator) => ({
  type: constants.SET_PAIRING_ROOM, collaborator
})

export const setRoleToDriver = () => ({
  type: constants.SET_ROLE, role: 'driver'
})

export const setRoleToNavigator = () => ({
  type: constants.SET_ROLE, role: 'navigator'
})

export const clearRole = () => ({
  type: constants.CLEAR_ROLE
})

export const clearRepos = () => ({
  type: constants.CLEAR_REPOS
})

// THUNKS

export const setSelectedRepo = (repoId) =>
	(dispatch, getState) => {
    const state = getState()
		const repos = state.repo.repoList
		const selectedRepoFromList = repos.filter(repo => repo.id === repoId)
		dispatch(selectedRepo(selectedRepoFromList[0]))
	}
