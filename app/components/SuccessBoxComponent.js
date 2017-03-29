import React from 'react'

export default class extends React.Component {

	constructor(props){
		super(props)
	}

	render() {
		return (
			<div className="git-headline-message">
				{this.props.successMessage}
				<div onClick={() => this.props.dispatchClearStatus()} className="close-git">
                  <i className="fa fa-times"/>
                 </div>
			</div>
		)
	}
}