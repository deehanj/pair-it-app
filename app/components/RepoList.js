import React from 'react'

const RepoList = (props) => {
const repos = props.repos
const name = props.name
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