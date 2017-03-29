import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING, DISPLAY_BRANCH_LIST, UPDATE_STATUS, UPDATE_COMMIT_MESSAGE, TOGGLE_GIT_MENU} from '../constants/GitButtonsConstants'
import chalk from 'chalk';
import store from '../store/configureStore.development'


export const toggleDisplayBranchList = (boolean) => 
	(dispatch, getState) => {
		if (getState().GitButtons.displayBranch) {
			return dispatch({ type: TOGGLE_BRANCH_DISPLAY, toggle: false})	
		} else {
			return dispatch({ type: TOGGLE_BRANCH_DISPLAY, toggle: true})
		}
	}

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

export const statusHandler = (successObject) => {
	let status;
	let staged = [];
	let yetToBeCommitted = [];

	for(var i = 0; i<successObject.files.length; i++){
		if(successObject.files[i].working_dir === ' '){
			staged.push(successObject.files[i].path);
		} else{
			yetToBeCommitted.push(successObject.files[i].path)
		}
	}

	let stagingArea = 'Files in your staging area: \n' + staged.join('\n') + '\n\n';
	let notAdded = 'Files yet to be added to your staging area: \n' + yetToBeCommitted.join('\n');

	if (staged.length == 0){
		if(yetToBeCommitted.length === 0 ){
			status = 'Nothing to commit, working directory clean'
		} else {
			status = notAdded;
		}
	} else if (yetToBeCommitted.length === 0) {
		status = stagingArea;
	} else {
		status = stagingArea + notAdded
	}
	if (successObject.conflicted.length != 0){
		let conflicted = successObject.conflicted.join('\n');
		status = status + 'conflictions: ' + conflicted;
	}
	return {
		type: UPDATE_STATUS,
		status
	}
}

export const commitHandler = (commitMessage) => ({
	type: UPDATE_COMMIT_MESSAGE,
	commitMessage
})

export const openGitMenu = (boolean) => ({
	type: TOGGLE_GIT_MENU,
	boolean
})

export const closeGitMenu = (boolean) => ({
	type: TOGGLE_GIT_MENU,
	boolean
})

export const clearStatus = () => ({
	type: UPDATE_STATUS,
	status: null
})

export const clearError = () => ({
	type: ERROR_DATA,
	errorMessage: null
})

export const resetBranchQuery = () => ({
	type: UPDATE_BRANCH_QUERY_STRING,
	branchQuery: ''
})

















