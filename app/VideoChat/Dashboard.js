import events from './events';
import React from 'react'
import UsersBox from './UsersBox';

export default class extends React.Component {
	constructor(props){
		super(props);
	}

	  render() {
	      return (
	          <div className="row">
	            <div className="col-xs-4 leftColumn">
	              <UsersBox />
	            </div>
	          </div>
	      );
	  }

}
