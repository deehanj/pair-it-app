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
			incomingCall: [],
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

		this.sortOutMedia = this.sortOutMedia.bind(this);
		this.backToRepos = this.backToRepos.bind(this);
	}

	componentDidMount() {
    socket.on('add client', (data) => {
			let newCollaborator = data.playerInfo

	  	const findCollaborator = (element) => element.name === newCollaborator.name

	  	if (this.state.collaborators.findIndex(findCollaborator) === -1){
	  		let collabArray = this.state.collaborators
	  		collabArray.push(newCollaborator)
	  		this.setState({collaborators: collabArray})

	  	}

	  socket.emit('I am here', {room: data.room, name: this.props.name, playerInfo: this.state.playerInfo})
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

	  socket.on('remove collaborator', (data) => {
	  	let removeCollaborator = data.playerInfo

	  	const newCollabArray = this.state.collaborators.filter((collaborator) => {
	  		collaborator.name != removeCollaborator.name
	  	})
	  		this.setState({collaborators: newCollabArray});
	  })

		socket.on('Partner', (data) => {
		  const partnerName = data.name
			const url = data.url
			this.props.updateSocketRoom(data.name)
      if (data.name === this.props.name) {
        const incomingCallArr = this.state.incomingCall.concat([data.caller])
        this.setState({ incomingCall: incomingCallArr })
        this.props.setPairingRoomURL(data.url);
      }
      this.props.setUnavailable(data.caller)
		})
		socket.emit('room', {room: this.props.repo.id, name: this.props.name, playerInfo: this.state.playerInfo})
    socket.on('go to pair room', this.props.clickToGoHome);

    socket.on('partner answered call', (data) => {
      if (data.caller === this.props.name) {
        this.props.clickToGoHome()
      }
      this.props.setUnavailable(data.receiver)
    })

    socket.on('make user available', (data) => {
      this.props.makeAvailable(data.name)
    })
	}

  componentWillUnmount() {
    socket.removeAllListeners('add client')
    socket.removeAllListeners('store collaborator')
    socket.removeAllListeners('remove collaborator')
    socket.removeAllListeners('Partner')
    socket.removeAllListeners('partner answered call')
  }

	sortOutMedia(){
		const MediaStreamURL = this.props.URL;
		const updateStoreRemoteURL = this.props.UpdateRemoteStream.bind(this);
		ConfigureSocket(socket, this.state.playerInfo, MediaStreamURL, updateStoreRemoteURL);
	}

	backToRepos() {
		this.props.returnToRepos();
		socket.emit('leaving room', {room: this.props.repo.id, playerInfo: this.state.playerInfo})
	}

	render (){
		return (
			<div>
				<h1>{this.props.repo.name}</h1>
				<h1 onClick={this.props.clickToGoHomeNav} >CLICK HERE TO GO HOME AS NAV!!!</h1>
				<h1 onClick={this.props.clickToGoHomeDriver} >CLICK HERE TO GO HOME AS DRIVER!!!</h1>
				<h2>Collaborators:</h2>
				{this.state.collaborators && this.state.collaborators.map(collaborator =>
						(
							<CollaboratorRowComponent
								key={collaborator.name}
								collaborator={collaborator}
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
                unavailable={this.props.unavailable}
							/>
						)
					)
				}
				<footer>
		            <div className="footer" onClick={this.backToRepos}><h3><i className="fa fa-arrow-left" />   Return to Repo Page Page</h3></div>
		        </footer>
			</div>
		)
	}
}
