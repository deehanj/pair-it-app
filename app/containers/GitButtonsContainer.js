import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import {connect} from 'react-redux';
import {toggleDisplayBranchList, successHandler, errorHandler, currentBranch, branchList, branchQuery} from '../actionCreators/GitButtonsActionCreators'

import GitButtonsComponent from '../components/GitButtonsComponent';

const mapStateToProps = (state) => {
	return {
		branchList: state.GitButtons.branchList,
		successData: state.GitButtons.successData,
		errorData: state.GitButtons.errorData,
		currentBranch: state.GitButtons.currentBranch,
		displayBranch: state.GitButtons.displayBranch,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDisplayBranches: () => {	
			dispatch(toggleDisplayBranchList())
		},
		handleSuccess: (successMessage) => {
			dispatch(successHandler(successMessage))
		},
		handleError: (errorMessage) => {
			dispatch(errorHandler(errorMessage))
		},
		updateCurrentBranch: (branch) => {
			dispatch(currentBranch(branch))
		},
		updateBranchList: (branchSummary) => {
			dispatch(branchList(branchSummary))
		},
		handleBranchChangeQuery: (typedBranch) => {
			dispatch(branchQuery(typedBranch.target.value))
		},
		checkoutBranch: () => {
			dispatch()
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GitButtonsComponent)