import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import { serverLocation } from '../utils/server.settings.js'
import {push} from 'react-router-redux'
import io from 'socket.io-client'

const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		repo: state.repo.selectedRepo,
		name: state.user.gitInfo.login
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
		this.state = {
			collaborators: []
		}

  socket.on('add client', (data) => {
  	let newCollaborator = data.name
  	const findCollaborator = (element) => element === newCollaborator
  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
  		let collabArray = this.state.collaborators
  		collabArray.push(newCollaborator)
  		this.setState({collaborators: collabArray})
  	}

  socket.emit('I am here', {room: data.room, name: this.props.name})
  })

  socket.on('store collaborator', (data) => {
  	let newCollaborator = data.name
  	const findCollaborator = (element) => element === newCollaborator
  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
  		let collabArray = this.state.collaborators
  		collabArray.push(newCollaborator)
  		this.setState({collaborators: collabArray})
  	}
  })

    }

componentDidMount() {
	socket.emit('room', {room: this.props.repo.id, name: this.props.name })
}

	render (){
	
		return (
			<div>
				<CollaboratorComponent collaborators={this.state.collaborators} clickToGoHome={this.props.clickToGoHome} repo={this.props.repo} />
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorContainer)
