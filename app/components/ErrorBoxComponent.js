import React from 'react';


export default class extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.errorMessage}
			</div>
		)
	}
}