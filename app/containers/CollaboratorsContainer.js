import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import CollaboratorRow from "../components/CollaboratorRow"
import { serverLocation } from '../utils/server.settings.js'
import {UpdateURL} from '../VideoChat/VideoChatActionCreators'
import {push} from 'react-router-redux'
// import events from '../VideoChat/events'
import ConfigureSocket from '../VideoChat/ConfiguringSocket'
import io from 'socket.io-client'
import {setPairingRoom} from '../reducers/repo';

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
			// socket.emit('go to pair room', {room: ownProps.repo.id, name: ownProps.collaborator})
		},
		clickToGoHome: () => {
			dispatch(push('/home'))
		},
		UpdateStream: (stream) => {
			dispatch(UpdateURL(stream))
		},
		setPairingRoomURL: (url) => {
			dispatch(setPairingRoom(url))
		}

	}
}

class CollaboratorContainer extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			collaborators: [{
	      name: '',
	      _id: ''
	    }],
			incomingCall: false,
			users: [],
			playerInfo: {
	      name: props.name,
	      _id: props.id,
				id: socket.id
	    },
			MediaStreamURL: this.props.URL
		}

		const playerInfo = {
      name: props.name,
      _id: props.id,
			id: socket.id
    };

	  socket.on('add client', (data) => {
			// console.log('in add client, data: ', data);
			let newCollaborator = data.playerInfo

	  	const findCollaborator = (element) => element.name === newCollaborator.name

	  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
	  		let collabArray = this.state.collaborators
	  		collabArray.push(newCollaborator)
	  		this.setState({collaborators: collabArray})
	  	}

	  socket.emit('I am here', {room: data.room, name: this.props.name, playerInfo})
	  })

	  socket.on('store collaborator', (data) => {
	  	let newCollaborator = data.playerInfo

	  	const findCollaborator = (element) => element.name === newCollaborator.name

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

			if (partnerName === props.name){
				this.setState({incomingCall: true})
				console.log('pair with me, incomingCall', this.state.incomingCall)
				this.props.setPairingRoomURL(data.url);
			}
				
				//1. let current user know someone wants to pair
				//2. say yes, let other person know you said yes
				//3. place room name on global state
				//4. add user media to the state
				//5. push to text editor
		})



    // const MediaStreamURL = this.state.MediaStreamURL;
    // console.log('is this an object?', MediaStreamURL);
    // ConfigureSocket(socket, playerInfo, MediaStreamURL);

		socket.on('refresh_user_list', this.setUserState);

		this.sortOutMedia = this.sortOutMedia.bind(this);

		socket.on('go to pair room', this.props.clickToGoHome);

  }

	componentDidMount() {
		socket.emit('room', {room: this.props.repo.id, name: this.props.name, playerInfo: this.state.playerInfo})

	}

	setUserState(users){
		console.log('User list from server: ', users);
			// this.setState({users: users});
	}

	sortOutMedia(){
		const MediaStreamURL = this.props.URL;
		console.log('is this an object?', MediaStreamURL);
		ConfigureSocket(socket, this.state.playerInfo, MediaStreamURL);
	}

	render (){

		// if (this.state.users) console.log('Users in state:', this.state.users);

		return (
			<div>
				<video id='webchatWindow'></video>
				<button onClick={this.sortOutMedia}>Sort out media</button>
				<h1>{this.props.repo.name}</h1>
				<h1 onClick={this.props.clickToGoHome} >CLICK HERE TO GO HOME!!!</h1>
				<h2>Collaborators:</h2>
				{this.state.collaborators && this.state.collaborators.map(collaborator => (
					<CollaboratorRow key={collaborator.name} collaborator={collaborator} goToPairRoom={this.props.goToPairRoom} repoId={this.props.repo.id} myName={this.props.name} myId={this.props.id} URL={this.props.URL} incomingCall={this.state.incomingCall}  UpdateStream={this.props.UpdateStream} sortOutMedia={this.sortOutMedia} setPairingRoomURL= {this.props.setPairingRoomURL} clickToGoHome={this.props.clickToGoHome}/>
				)) }
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorContainer)

{/*<div>
	<CollaboratorComponent collaborators={this.state.collaborators} clickToGoHome={this.props.clickToGoHome} repo={this.props.repo} goToPairRoom={this.props.goToPairRoom} incomingCall={this.state.incomingCall} />
</div>*/}
