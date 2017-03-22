import React from 'react'
import {connect} from 'react-redux'
import RepoList from '../components/RepoList'
import {setSelectedRepo} from '../reducers/repo'

const mapStateToProps = (state) => {
	return {
		repos: state.repo.repoList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSelectRepo: repoId => dispatch(setSelectedRepo(repoId))
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

