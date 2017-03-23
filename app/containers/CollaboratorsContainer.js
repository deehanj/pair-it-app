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
  	console.log(data.name)
  	let newCollaborator = data.name
  	const findCollaborator = (element) => element === newCollaborator
  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
  		let collabArray = this.state.collaborators
  		collabArray.push(newCollaborator)
  		this.setState({collaborators: collabArray})
  		console.log('collab list 1', this.state.collaborators)
  	}

  socket.emit('I am here', {room: data.room, name: this.props.name})
  })

  socket.on('store collaborator', (data) => {
  	console.log('new person', data.name)
  	let newCollaborator = data.name
  	const findCollaborator = (element) => element === newCollaborator
  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
  		let collabArray = this.state.collaborators
  		collabArray.push(newCollaborator)
  		this.setState({collaborators: collabArray})
  		console.log('collab list 2', this.state.collaborators)
  	}
  })

    }

componentDidMount() {
	socket.emit('room', {room: this.props.repo.id, name: this.props.name })
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
