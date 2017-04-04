import React from 'react'
import { connect } from 'react-redux'
import RepoListComponent from '../components/RepoListComponent'
import NavBar from '../components/NavBarComponent'
import { setSelectedRepo } from '../actionCreators/RepoActionCreators'
import { push } from 'react-router-redux'
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
		  dispatch(push('/login'))
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
		const d = new Date(date)
		return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}, at ${d.getHours()}:${d.getMinutes()}`;
	}

	sortReposByDate(list) {
		return list.sort( (a, b) => {
			let date1 = new Date(a.pushed_at)
			let date2 = new Date(b.pushed_at)
		  return date2 - date1;
		})
	}

	render (){

		let sortedRepos = this.sortReposByDate(this.props.repos)

		return (
			<div>
				<NavBar />
				<RepoListComponent repos={this.props.repos} dispatchSelectRepo={this.props.dispatchSelectRepo} goToRemoteLink={this.goToRemoteLink} readableDate={this.readableDate} sortedRepos={sortedRepos}  />
			</div>
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer)


{/*sortedRepos={this.props.sortedRepos}*/}
