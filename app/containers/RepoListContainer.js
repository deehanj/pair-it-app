import React from 'react'
import {connect} from 'react-redux'
import RepoList from '../components/RepoList'
import {setSelectedRepo} from '../reducers/repo'
import {push} from 'react-router-redux'
import { serverLocation } from '../utils/server.settings.js'
import io from 'socket.io-client'

const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		repos: state.repo.repoList,
		name: state.user.gitInto.login
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSelectRepo: (repoId, name) => {
			dispatch(setSelectedRepo(repoId))
			socket.emit('room', {room: repoId, name: name})
			dispatch(push('/collaborators'))
		}
	}
}

class RepoListContainer extends React.Component {
	constructor(props){
		super(props)
    }


    

	render (){
	
		return (
			<RepoList repos={this.props.repos} onClick={this.props.dispatchSelectRepo}/>
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer)

