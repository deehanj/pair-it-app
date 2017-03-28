import React from 'react'

const RepoList = (props) => {
const repos = props.repos
const name = props.name
const dispatchSelectRepo = props.onClick
	return (
		<div>
			<div className="col-sm-12">
			<h1 className="text-center">Select A Git Repo</h1>
			</div>
			<div className="repo-list-container"> {repos && repos.map(repo => 
				(<div className="col-md-6 repo" key={repo.id} onClick={() => {
					dispatchSelectRepo(repo.id); 
					}}><h3>{repo.name}</h3></div>))}
			</div>
		</div>
		)

}

export default RepoList