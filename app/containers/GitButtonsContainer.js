import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import {connect} from 'react-redux';
import {toggleDisplayBranchList, successHandler, errorHandler, currentBranch, branchList, branchQuery, displayTrue} from '../actionCreators/GitButtonsActionCreators'

import GitButtonsComponent from '../components/GitButtonsComponent';

const mapStateToProps = (state) => {
	return {
		branchList: state.GitButtons.branchList,
		successData: state.GitButtons.successData,
		errorData: state.GitButtons.errorData,
		currentBranch: state.GitButtons.currentBranch,
		displayBranch: state.GitButtons.displayBranch,
		branchQuery: state.GitButtons.branchQuery,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		displayBranches: () => {
			dispatch(displayTrue())
		},
		toggleDisplayBranches: () => {	
			dispatch(toggleDisplayBranchList())
		},
		handleSuccess: (successMessage) => {
			dispatch(successHandler(successMessage))
		},
		handleError: (errorMessage) => {
			dispatch(errorHandler(errorMessage))
		},
		updateBranchList: (branchSummary) => {
			dispatch(branchList(branchSummary))
		},
		handleBranchChangeQuery: (typedBranch) => {
			const branchInput = document.getElementById('branchInput')
			branchInput.style.cssText = "color:black;"
			dispatch(branchQuery(typedBranch.target.value))
		},
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GitButtonsComponent)