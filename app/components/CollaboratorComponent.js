import React from 'react'
import {connect} from 'react-redux'

import NavBar from './NavBarComponent'
import CollaboratorRowComponent from "./CollaboratorRowComponent"
import { serverLocation } from '../utils/server.settings.js'
import {UpdateURL, UpdateLocalURL, UpdateRemoteURL} from '../actionCreators/VideoChatActionCreators'
import {push} from 'react-router-redux'
import ConfigureSocket from '../utils/ConfiguringSocket'
import io from 'socket.io-client'
import {setPairingRoom, setPairingPartner} from '../reducers/repo';

const logo = require('img/Pairit.logo.svg')

const shell = window.require('electron').shell

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
				id: socket.id,
				avatar_url: props.avatar_url
			},
			MediaStreamURL: this.props.URL
		}

		// const playerInfo = {
    //   name: props.name,
    //   _id: props.id,
		// 	id: socket.id,
		// 	avatar_url: props.avatar_url
    // };

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

	goToRemoteLink(url) {
		shell.openExternal(url);
	}

	readableDate(date) {
		//"2017-03-16T20:51:55Z"
		const broken = date.split('T')
		const day = broken[0].split('-')
		const dayString = `${day[1]}-${day[2]}-${day[0]}`
		const time = broken[1].split(':')
		const timeString = `${time[0]}:${time[1]}`

		return `${dayString} at ${timeString}`

	}

	render (){
		return (
			<div>
				<NavBar />
				<div className="col-sm-12 repo-list-container">
					<h1>Select Collaborator:</h1>
					<br />
					<div className="row col-sm-12">
						<h1 className="repo-name-collab" >{this.props.repo.name}</h1>
						<h4  className="view-on-github" onClick={() => this.goToRemoteLink(this.props.repo.html_url)}><i className="fa fa-github" /> View on GitHub</h4>
						<h4 className="date-changed-collab">Last edited on {this.readableDate(this.props.repo.pushed_at)}</h4>
						<h4 className="repo-owner">Owned by <span
								className="repo-owner-name"
								onClick={() => goToRemoteLink(this.props.repo.owner.html_url)
								}>{this.props.repo.owner.login}</span> <img className="sm-avatar" src={this.props.repo.owner.avatar_url} />
							</h4>
							{ this.props.repo.description
							? <h3 className="repo-description">Description: {this.props.repo.description}</h3>
							: null}
					</div>
					<div className="row col-sm-12 collab-list">
						<h2 id="available-collabs">Available Collaborators:</h2>
						<div className="collaborators-array">
						{this.state.collaborators.length ? this.state.collaborators.map(collaborator =>
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
							:
							(<div>
								<h3 className="missing-collabs" >There are no available collaborators.</h3>
								<img src={logo} className="collab-logo" />
							</div>)
						}
						</div>
					</div>


				</div>
				<footer className="collab-footer">
          <div onClick={this.backToRepos}><h3 className="back-arrow"><i className="fa fa-arrow-left" />   Return to Repo Page</h3></div>
        </footer>
			</div>
		)
	}
}

{/*<div className="back-arrow dev-buttons">
	<h5 onClick={this.props.clickToGoHomeNav} >Home Nav</h5>
	<h5 onClick={this.props.clickToGoHomeDriver} >Home Driver</h5>
</div>*/}
