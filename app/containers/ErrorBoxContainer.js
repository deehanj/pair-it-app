import React from 'react'
import {connect} from 'react-redux'
import { clearStatus } from '../actionCreators/GitButtonsActionCreators'


import ErrorBoxComponent from '../components/ErrorBoxComponent'

const mapStateToProps = (state) => {
	return {
		errorMessage: state.GitButtons.errorData,
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {
			dispatchClearStatus: () => dispatch(clearStatus(statusType))

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorBoxComponent)