import React from 'react'

const RepoList = (props) => {
const repos = props.repos
const name = props.name
const dispatchSelectRepo = props.dispatchSelectRepo
const goToRemoteLink = props.goToRemoteLink
const readableDate = props.readableDate

	return (
		<div>
			<div className="col-sm-12 repo-list-container">
				<h1>Select A Git Repo</h1>
				<div> {repos && repos.map(repo =>
					(<div className="repo" key={repo.id} >
							<h1
								className="repo-name"
								onClick={() => dispatchSelectRepo(repo.id)
							} >{repo.name}</h1>
							<h4 className="repo-owner-name" onClick={() => goToRemoteLink(repo.owner.html_url)
							}><i className="fa fa-github" /> View on GitHub</h4>
							<h4 className="date-changed">Last edited on {readableDate(repo.pushed_at)}</h4>
							<h4 className="repo-owner">Owned by <span
									className="repo-owner-name"
									onClick={() => goToRemoteLink(repo.owner.html_url)
									}>{repo.owner.login}</span> <img className="sm-avatar" src={repo.owner.avatar_url} />
								</h4>
					</div>))}
				</div>
			</div>
		</div>
		)

}

export default RepoList
