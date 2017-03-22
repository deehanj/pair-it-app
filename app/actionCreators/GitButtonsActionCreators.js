import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING, DISPLAY_BRANCH_LIST} from '../constants/GitButtonsConstants'


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
	currentBranch: branch
})

export const branchList = (branchSummary) => {
	let currentBranch;
	const branchList = [];
	for ( let branch in branchSummary.branches ) {
		if ( branchSummary.branches[branch].current === true ) {
			currentBranch = branch;
		}
		branchList.push(branchSummary.branches[branch]);
	}
	return {
		type: UPDATE_BRANCH_LIST, 
		branchList: branchList,
		currentBranch
	}
}

export const branchQuery = (typedQuery) => ({
	type: UPDATE_BRANCH_QUERY_STRING,
	branchQuery: typedQuery
})

export const displayTrue = () => ({
	type: DISPLAY_BRANCH_LIST,
})