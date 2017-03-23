import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import CollaboratorRow from "../components/CollaboratorRow"
import { serverLocation } from '../utils/server.settings.js'
import {UpdateURL} from '../VideoChat/VideoChatActionCreators'
import {push} from 'react-router-redux'
import io from 'socket.io-client'

const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		repo: state.repo.selectedRepo,
		name: state.user.gitInfo.login,
		URL: state.VideoChat.URL,
		id: state.user.gitInfo.id
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		goToPairRoom: () => {
		  console.log('Got to pair room: ', ownProps);
			// socket.emit('Pair with me', {room: ownProps.repo.id, name: ownProps.collaborator})
		},
		clickToGoHome: () => {
			dispatch(push('/home'))
		},
		UpdateStream: (stream) => {
			dispatch(UpdateURL(stream))
		}
	}
}

class CollaboratorContainer extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			collaborators: [],
			incomingCall: false
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

		socket.on('Partner', (data) => {
			console.log('Partnering: ', data);
			console.log('state name: ', props.name);
		  const partnerName = data.name
			const url = data.url

			if (partnerName === props.name)
				this.setState({incomingCall: true})
				console.log('pair with me, incomingCall', this.state.incomingCall)
				//1. let current user know someone wants to pair
				//2. say yes, let other person know you said yes
				//3. place room name on global state
				//4. add user media to the state
				//5. push to text editor
		})

    }

componentDidMount() {
	socket.emit('room', {room: this.props.repo.id, name: this.props.name })
}

	render (){

		return (
			<div>
				<h1>{this.props.repo.name}</h1>
				<h1 onClick={this.props.clickToGoHome} >CLICK HERE TO GO HOME!!!</h1>
				<h2>Collaborators:</h2>
				{this.state.collaborators && this.state.collaborators.map(collaborator => (
					<CollaboratorRow key={collaborator} collaborator={collaborator} goToPairRoom={this.props.goToPairRoom} repoId={this.props.repoId} myName={this.props.name} myId={this.props.id} URL={this.props.URL} incomingCall={this.state.incomingCall} />
				)) }
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorContainer)

{/*<div>
	<CollaboratorComponent collaborators={this.state.collaborators} clickToGoHome={this.props.clickToGoHome} repo={this.props.repo} goToPairRoom={this.props.goToPairRoom} incomingCall={this.state.incomingCall} />
</div>*/}
