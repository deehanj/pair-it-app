import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING} from '../constants/GitButtonsConstants'


export const toggleDisplayBranchList = () => ({
	type: TOGGLE_BRANCH_DISPLAY,
})

export const successHandler = (successMessage) => ({
	type: SUCCESS_DATA, 
	successMessage
})

export const errorHandler = (errorMessage) => ({
	type: ERROR_DATA,  
	errorMessage
})

export const currentBranch = (branch) => ({
	type: UPDATE_CURRENT_BRANCH, 
	branch
})

export const branchList = (branchSummary) => ({
	type: UPDATE_BRANCH_LIST, 
	branchList: branchSummary
})

export const branchQuery = (typedQuery) => ({
	type: UPDATE_BRANCH_QUERY_STRING,
	branchQuery: typedQuery
})