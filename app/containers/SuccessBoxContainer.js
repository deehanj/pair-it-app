import React from 'react'
import {connect} from 'react-redux'
import SuccessBoxComponent from '../components/SuccessBoxComponent'

const mapStateToProps = (state) => {
	return {
		successMessage: state.GitButtons.successData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessBoxComponent);