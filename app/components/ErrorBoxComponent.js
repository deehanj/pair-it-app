import React from 'react';

export default class extends React.Component {

	constructor(props){
		super(props);
	}

render() {
		return (
			<div className="git-headline-message">
				<h3>Error!</h3>
				{this.props.errorMessage}
				<div onClick={() => this.props.dispatchClearError()} className="close-git">
                  <i className="fa fa-times"/>
                 </div>
			</div>
		)
	}
}