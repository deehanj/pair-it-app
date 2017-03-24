import React from 'react'
import {connect} from 'react-redux'

import ErrorBoxComponent from '../components/ErrorBoxComponent'

const mapStateToProps = (state) => {
	return {
		errorMessage: state.GitButtons.errorData,
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorBoxComponent)