import React from 'react'
import {connect} from 'react-redux'
import RepoListComponent from '../components/RepoListComponent'
import {setSelectedRepo} from '../reducers/repo'
import {push} from 'react-router-redux'
import { serverLocation } from '../utils/server.settings.js'
import io from 'socket.io-client'

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

	render (){

		return (

			<div>
				<nav className="row">
					<img className="img-responsive logo logo-nav" src="images/pairit.logotitle.svg" onClick={this.props.dispatchReturnToLogin} />
				</nav>
				<RepoListComponent repos={this.props.repos} onClick={this.props.dispatchSelectRepo}/>
			</div>
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer)
