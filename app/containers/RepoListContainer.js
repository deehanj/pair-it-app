import React from 'react'
import {connect} from 'react-redux'
import RepoListComponent from '../components/RepoListComponent'
import NavBar from '../components/NavBarComponent'
import {setSelectedRepo} from '../reducers/repo'
import {push} from 'react-router-redux'
import { serverLocation } from '../utils/server.settings.js'
import io from 'socket.io-client'

const shell = window.require('electron').shell

const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		repos: state.repo.repoList,
		userURL: state.user.gitInfo.url,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSelectRepo: (repoId, name) => {
			dispatch(setSelectedRepo(repoId))
			dispatch(push('/collaborators'))
		},
		dispatchReturnToLogin: () => {
		  dispatch(push('/LoginComponent'))
		}
	}
}

class RepoListContainer extends React.Component {
	constructor(props){
		super(props)
  }

  componentDidMount() {
    socket.emit('room', {room: this.props.userURL})
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
				<RepoListComponent repos={this.props.repos} dispatchSelectRepo={this.props.dispatchSelectRepo} goToRemoteLink={this.goToRemoteLink} readableDate={this.readableDate} />
			</div>
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer)
