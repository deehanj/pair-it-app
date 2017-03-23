import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import {push} from 'react-router-redux'

const mapStateToProps = (state) => {
	return {
		repo: state.repo.selectedRepo
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clickToGoHome: () => {
			dispatch(push('/home'))
		}
	}
}

class CollaboratorContainer extends React.Component {
	constructor(props){
		super(props)
    }
    

	render (){
	
		return (
			<div>
				<h1>{this.props.repo.name}</h1>
				<h1 onClick={this.props.clickToGoHome}>CLICK HERE TO GO HOME</h1>
				
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorContainer)
