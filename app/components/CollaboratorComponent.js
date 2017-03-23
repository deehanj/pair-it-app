import React from 'react'
import CollaboratorRow from "./CollaboratorRow"

const CollaboratorComponent = (props) => {
	const repoName = props.repo.name
	const repoId = props.repo.id
	const clickToGoHome = props.clickToGoHome
	const collaborators = props.collaborators
	const goToPairRoom = props.goToPairRoom
	const myName = props.name

		return (
			<div>
				<h1>{repoName}</h1>
				<h1 onClick={clickToGoHome} >CLICK HERE TO GO HOME!!!</h1>
				<h2>Collaborators:</h2>
				{collaborators && collaborators.map(collaborator => (
					<CollaboratorRow key={collaborator} collaborator={collaborator} goToPairRoom={goToPairRoom} repoId={repoId} myName={myName} />
				)) }
			</div>
			)

}

export default CollaboratorComponent
