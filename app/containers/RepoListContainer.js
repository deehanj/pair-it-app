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
			<RepoListComponent repos={this.props.repos} onClick={this.props.dispatchSelectRepo}/>
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer)

