import events from './events';
import React from 'react'
import UsersBox from './UsersBox';



export default class extends React.Component{
	constructor(props){
		super(props);
	}

	  render() {
	      return (
	          <div className="row">
	            <div className="col-xs-4 leftColumn">
	              <UsersBox URL ={this.props}/>
	            </div>
	            <div className="col-xs-8 rightColumn">
	              <video id="video" autoPlay></video>
	            </div>
	          </div>
	      );
	  }


}
