import React from 'react'
import {connect} from 'react-redux'

import CollaboratorRowComponent from "./CollaboratorRowComponent"
import { serverLocation } from '../utils/server.settings.js'
import {UpdateURL, UpdateLocalURL, UpdateRemoteURL} from '../actionCreators/VideoChatActionCreators'
import {push} from 'react-router-redux'
import ConfigureSocket from '../utils/ConfiguringSocket'
import io from 'socket.io-client'
import {setPairingRoom, setPairingPartner} from '../reducers/repo';

const socket = io(serverLocation)

export default class CollaboratorComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			collaborators: [],
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

	  	if (this.state.collaborators.findIndex(findCollaborator) === -1) {
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
			this.props.updateSocketRoom(data.name)
			if (partnerName === props.name){
				this.setState({incomingCall: true})
				console.log('pair with me, incomingCall', this.state.incomingCall)
				this.props.setPairingRoomURL(data.url);
			}

		})

		socket.on('refresh_user_list', this.setUserState);

		this.sortOutMedia = this.sortOutMedia.bind(this);

		socket.on('go to pair room', this.props.clickToGoHome);

	}

	componentDidMount() {
		socket.emit('room', {room: this.props.repo.id, name: this.props.name, playerInfo: this.state.playerInfo})
	}

	setUserState(users){
		console.log('User list from server: ', users);
	}

	sortOutMedia(){
		const MediaStreamURL = this.props.URL;
		console.log('is this an object?', MediaStreamURL);
		const updateStoreRemoteURL = this.props.UpdateRemoteStream.bind(this);
		ConfigureSocket(socket, this.state.playerInfo, MediaStreamURL, updateStoreRemoteURL);
	}

	render (){

		return (
			<div>
				<video id='webchatWindow'></video>
				<button onClick={this.sortOutMedia}>Sort out media</button>
				<h1>{this.props.repo.name}</h1>
				<h1 onClick={this.props.clickToGoHome} >CLICK HERE TO GO HOME!!!</h1>
				<h2>Collaborators:</h2>
				{this.state.collaborators && this.state.collaborators.map(collaborator =>
						(
							<CollaboratorRowComponent 
								key={collaborator.name} 
								collaborator={collaborator} 
								goToPairRoom={this.props.goToPairRoom} 
								repoId={this.props.repo.id} 
								myName={this.props.name} 
								myId={this.props.id} 
								URL={this.props.URL} 
								incomingCall={this.state.incomingCall}  
								UpdateStream={this.props.UpdateStream} 
								UpdateLocalStream={this.props.UpdateLocalStream}
								sortOutMedia={this.sortOutMedia} 
								setPairingRoomURL={this.props.setPairingRoomURL} 
								clickToGoHome={this.props.clickToGoHome} 
								setPairPartner={this.props.setPairPartner} 

							/>
						)
					) 
				}
			</div>
		)
	}
}