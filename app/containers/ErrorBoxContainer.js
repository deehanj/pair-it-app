import React from 'react'
import {connect} from 'react-redux'
import { clearError } from '../actionCreators/GitButtonsActionCreators'


import ErrorBoxComponent from '../components/ErrorBoxComponent'

const mapStateToProps = (state) => {
	return {
		errorMessage: state.GitButtons.errorData,
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {
			dispatchClearError: () => dispatch(clearError())

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorBoxComponent)