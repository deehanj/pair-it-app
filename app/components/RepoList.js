import React from 'react'
import {hashhistory} from 'react-router-redux'

const RepoList = (props) => {
const repos = props.repos
const dispatchSelectRepo = props.onClick
	return (
		<div>
			<h1>This is the repo list</h1>
			<div> {repos && repos.map(repo => 
				(<div key={repo.id} onClick={() => {
					dispatchSelectRepo(repo.id); 
					}}>{repo.name}</div>))}
			</div>
		</div>
		)

}

export default RepoList