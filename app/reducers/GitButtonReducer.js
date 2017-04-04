import * as constants from '../constants/GitButtonsConstants'

const initialState = {
	branchList: [],
	successData: null,
	errorData: null,
	currentBranch: '',
	displayBranch: false,
	branchQuery: '',
	commitMessage: '',
	open: false
}

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state)
		switch (action.type) {
			case constants.TOGGLE_BRANCH_DISPLAY:
				newState.displayBranch = action.toggle
				break
			case constants.SUCCESS_DATA:
				newState.successData = action.successMessage
				break
			case constants.ERROR_DATA:
				newState.errorData =  action.errorMessage
				break
			case constants.UPDATE_CURRENT_BRANCH:
				newState.currentBranch = action.currentBranch
				break
			case constants.UPDATE_BRANCH_LIST:
				newState.currentBranch = action.currentBranch
				newState.branchList = action.branchList
				break
			case constants.UPDATE_BRANCH_QUERY_STRING:
				newState.branchQuery = action.branchQuery
				break
			case constants.DISPLAY_BRANCH_LIST:
				newState.displayBranch = true
				break
			case constants.UPDATE_STATUS:
				newState.successData = action.status
				break
			case constants.UPDATE_COMMIT_MESSAGE:
				newState.commitMessage = action.commitMessage
				break
			case constants.TOGGLE_GIT_MENU:
				newState.open = action.boolean
				break
			case constants.CLEAR_GIT:
				return initialState
			default:
				return state
		}
	return newState;
}

export default reducer;
