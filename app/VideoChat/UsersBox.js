import React from 'react';
import UserRow from './UserRow'
import events from './events';

export default class extends React.Component{
	
	constructor(props){
		super(props);

		this.state = {
			users:[]
		}
	    this.callBack = this.callBack.bind(this);
	}

	componentDidMount(){
	 	events.suscribe('users',this.callBack);
	}


	callBack(users){
	    this.setState({users: users});
	}

	render() {

	  var URL = this.props.URL

	  return (
	      <div>
	        <div className="title">Users connected</div>
	        {this.state.users.length > 0 && this.state.users.map(user => <UserRow user={user} URL={URL}/>)}
	      </div>
	  );
	}

}
