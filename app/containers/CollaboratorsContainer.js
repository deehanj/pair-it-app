import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import {UpdateURL, UpdateLocalURL, UpdateRemoteURL} from '../actionCreators/VideoChatActionCreators'
import {push} from 'react-router-redux'
import {setPairingRoom, setPairingPartner} from '../reducers/repo';
import {setSocketRoom }from '../actionCreators/RoomActionCreators'

const mapStateToProps = (state) => {
	return {
		repo: state.repo.selectedRepo,
		name: state.user.gitInfo.login,
		URL: state.VideoChat.URL,
		id: state.user.gitInfo.id,
		
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		goToPairRoom: () => {
		  console.log('Got to pair room: ', ownProps);
		},
		clickToGoHome: () => {
			dispatch(push('/home'))
		},
		UpdateStream: (stream) => {
			dispatch(UpdateURL(stream))
		},
		UpdateLocalStream: (stream) => {
			dispatch(UpdateLocalURL(stream))
		},
		UpdateRemoteStream: (stream) => {
			dispatch(UpdateRemoteURL(stream))
		},
		setPairingRoomURL: (url) => {
			dispatch(setPairingRoom(url))
		},
		setPairPartner: (collaborator) => {
			dispatch(setPairingPartner(collaborator))
		},
		updateSocketRoom: (room) => {
			dispatch(setSocketRoom(room))
		},
		returnToRepos: () => {
			dispatch(push('/repos'))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorComponent)

