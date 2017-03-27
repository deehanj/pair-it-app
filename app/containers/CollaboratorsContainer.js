import React from 'react'
import {connect} from 'react-redux'
import CollaboratorComponent from '../components/CollaboratorComponent'
import {UpdateURL, UpdateLocalURL, UpdateRemoteURL} from '../actionCreators/VideoChatActionCreators'
import {push} from 'react-router-redux'
import {setRoleToDriver, setRoleToNavigator, setPairingRoom, setPairingPartner} from '../reducers/repo';
import {setUnavailable, setAvailable} from '../reducers/user'
import {setSocketRoom }from '../actionCreators/RoomActionCreators'

const mapStateToProps = (state) => {
	return {
		repo: state.repo.selectedRepo,
		name: state.user.gitInfo.login,
		URL: state.VideoChat.URL,
		id: state.user.gitInfo.id,
    unavailable: state.user.unavailable
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    clickToGoHome: () => dispatch(push('/home')),
		clickToGoHomeNav: () => {
			dispatch(setRoleToNavigator())
			dispatch(push('/home'))
		},
		clickToGoHomeDriver: () => {
			dispatch(setRoleToDriver())
			dispatch(push('/home'))
		},
		UpdateStream: (stream) => dispatch(UpdateURL(stream)),
		UpdateLocalStream: (stream) => dispatch(UpdateLocalURL(stream)),
		UpdateRemoteStream: (stream) => dispatch(UpdateRemoteURL(stream)),
		setPairingRoomURL: (url) => dispatch(setPairingRoom(url)),
		setPairPartner: (collaborator) => dispatch(setPairingPartner(collaborator)),
		updateSocketRoom: (room) => dispatch(setSocketRoom(room)),
		returnToRepos: () => dispatch(push('/repos')),
    setUnavailable: (name) => dispatch(setUnavailable(name)),
    makeAvailable: (name) => dispatch(setAvailable(name))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorComponent)

