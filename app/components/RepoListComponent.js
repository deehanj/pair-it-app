import React from 'react'

const RepoList = (props) => {
const repos = props.repos
const name = props.name
const dispatchSelectRepo = props.onClick
	return (
		<div>
			<div className="col-sm-12 repo-list-container">
				<h1 className="">Select A Git Repo</h1>
				<div className="repo-list-container"> {repos && repos.map(repo =>
					(<div className="col-md-12 repo" key={repo.id} onClick={() => {
						dispatchSelectRepo(repo.id);
						}}><h3>{repo.name}</h3></div>))}
				</div>
			</div>
		</div>
		)

}

export default RepoList
