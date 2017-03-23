import {TOGGLE_BRANCH_DISPLAY, SUCCESS_DATA, ERROR_DATA, UPDATE_CURRENT_BRANCH, UPDATE_BRANCH_LIST, UPDATE_BRANCH_QUERY_STRING, DISPLAY_BRANCH_LIST, UPDATE_STATUS, UPDATE_COMMIT_MESSAGE} from '../constants/GitButtonsConstants'
import chalk from 'chalk';

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

export const statusHandler = (successObject) => {
	let status;
	let staged = successObject.modified;
	let allFiles = successObject.files.map((fileObj) => fileObj.path);
	let yetToBeCommitted = [];

	for(var i = 0; i < allFiles.length; i++){
		if(staged.indexOf(allFiles[i]) === -1){
			yetToBeCommitted.push(allFiles[i])
		}
	}

	let stagingArea = 'Files in your staging area: \n' + staged.join('\n') + '\n\n';
	let notAdded = 'Files yet to be added to your staging area: \n' + yetToBeCommitted.join('\n');

	if (staged.length == 0){
		if(yetToBeCommitted.length === 0 ){
			status = 'No file changes'
		} else {
			status = notAdded;
		}
	} else if (yetToBeCommitted.length === 0) {
		status = stagingArea;
	} else {
		status = stagingArea + notAdded
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

















