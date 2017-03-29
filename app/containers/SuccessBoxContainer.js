import React from 'react'
import {connect} from 'react-redux'
import { clearStatus } from '../actionCreators/GitButtonsActionCreators'

import SuccessBoxComponent from '../components/SuccessBoxComponent'

const mapStateToProps = (state) => {
	return {
		successMessage: state.GitButtons.successData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
			dispatchClearStatus: () => dispatch(clearStatus(statusType))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessBoxComponent);