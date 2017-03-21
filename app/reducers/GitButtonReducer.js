import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING } from '../constants/GitButtonsConstants'

const initialState = {
	branchList: [],
	successData: '',
	errorData: '',
	currentBranch: '',
	displayBranch: false,
	branchQuery: '',
}

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state)
		switch (action.type) {
			case TOGGLE_BRANCH_DISPLAY:
				newState.displayBranch = (state.displayBranch) ? false : true
				break
			case SUCCESS_DATA:
				newState.successData = action.successData
				break
			case ERROR_DATA:
				newState.errorData = action.errorData
				break
			case UPDATE_CURRENT_BRANCH:
				newState.currentBranch = action.currentBranch
				break
			case UPDATE_BRANCH_LIST:
				newState.branchList = action.branchList
			case UPDATE_BRANCH_QUERY_STRING:
				newState.branchQuery = action.branchQuery
				break
			default:
				return state
		}
	return newState;
}

export default reducer;
