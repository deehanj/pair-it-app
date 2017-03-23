import React from 'react'

const CollaboratorComponent = (props) => {
const repoName = props.repo.name
const clickToGoHome = props.clickToGoHome
const collaborators = props.collaborators

	return (
		<div>
			<h1>{repoName}</h1>
			<h1 onClick={clickToGoHome} >CLICK HERE TO GO HOME!!!</h1>
			<h2>Collaborators:</h2>
			{collaborators && collaborators.map(collaborator => (
				<div key={collaborator}>{collaborator}</div>
			)) }
		</div>
		)

}

export default CollaboratorComponent