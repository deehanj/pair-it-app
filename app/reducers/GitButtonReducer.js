import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING , DISPLAY_BRANCH_LIST, UPDATE_STATUS, UPDATE_COMMIT_MESSAGE, TOGGLE_GIT_MENU} from '../constants/GitButtonsConstants'

const initialState = {
	branchList: [],
	successData: '',
	errorData: '',
	currentBranch: '',
	displayBranch: false,
	branchQuery: '',
	commitMessage: '',
	open: false
}

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state)
		switch (action.type) {
			case TOGGLE_BRANCH_DISPLAY:
				newState.displayBranch = (state.displayBranch) ? false : true
				break
			case SUCCESS_DATA:
				newState.successData = action.successMessage
				break
			case ERROR_DATA:
				newState.errorData =  action.errorMessage
				break
			case UPDATE_CURRENT_BRANCH:
				newState.currentBranch = action.currentBranch
				break
			case UPDATE_BRANCH_LIST:
				newState.currentBranch = action.currentBranch
				newState.branchList = action.branchList
			case UPDATE_BRANCH_QUERY_STRING:
				newState.branchQuery = action.branchQuery
				break
			case DISPLAY_BRANCH_LIST:
				newState.displayBranch = true
				break
			case UPDATE_STATUS:
				newState.successData = action.status
				break
			case UPDATE_COMMIT_MESSAGE:
				newState.commitMessage = action.commitMessage
				break
			case TOGGLE_GIT_MENU:
				newSate.open = action.boolean
				break
			default:
				return state
		}
	return newState;
}

export default reducer;
