import React from 'react';
import UserRow from './UserRow'
import events from './events';

export default class extends React.Component{
	
	constructor(props){
		super(props);

		this.state = {
			users:[]
		}

	    // Set initial application state using props
	    this.intitialize = this.intitialize.bind(this);
	    this.callBack = this.callBack.bind(this);

	}
	 

	  intitialize(){
	  	events.suscribe('users',this.callBack);
	  }

	  callBack(users){
	  	if(this.isMounted()){
	        this.setState({users: users});
	      }
	  }

	  render() {

	  		this.intitialize();
	      var self = this;
	      var rows = [];

	      
	      this.state.users.forEach(function(user) {
	        rows.push(<UserRow user={user} />);
	      });

	      return (
	          <div>
	            <div className="title">Users connected</div>
	            {rows}
	          </div>
	      );
	  }

}
