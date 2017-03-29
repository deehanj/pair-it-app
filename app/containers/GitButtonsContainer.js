import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import {connect} from 'react-redux';
import { clearStatus, closeGitMenu, toggleDisplayBranchList, successHandler, errorHandler, currentBranch, branchList, branchQuery, displayTrue, statusHandler, commitHandler} from '../actionCreators/GitButtonsActionCreators'
import GitButtonsComponent from '../components/GitButtonsComponent';

const mapStateToProps = (state) => {
	return {
		branchList: state.GitButtons.branchList,
		successData: state.GitButtons.successData,
		errorData: state.GitButtons.errorData,
		currentBranch: state.GitButtons.currentBranch,
		displayBranch: state.GitButtons.displayBranch,
		branchQuery: state.GitButtons.branchQuery,
		commitMessage: state.GitButtons.commitMessage,
		dir: state.fileSystem.dir,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		displayBranches: () => dispatch(displayTrue()),
		toggleDisplayBranches: () => dispatch(toggleDisplayBranchList()),
		handleSuccess: (successMessage) => dispatch(successHandler(successMessage)),
		handleError: (errorMessage) => dispatch(errorHandler(errorMessage)),
		updateBranchList: (branchSummary) => dispatch(branchList(branchSummary)),
		handleBranchChangeQuery: (typedBranch) => {
			const branchInput = document.getElementById('branchInput')
			branchInput.style.cssText = "color:black;"
			dispatch(branchQuery(typedBranch.target.value))
		},
		handleStatus: (status) => dispatch(statusHandler(status)),
		handleCommitMessage: (typedCommit) => dispatch(commitHandler(typedCommit.target.value)),
		dispatchCloseGitMenu: () => dispatch(closeGitMenu(false)),
		dispatchClearStatus: () => dispatch(clearStatus())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GitButtonsComponent)