import React from 'react';
import io from 'socket.io-client';
import init from './InitiateConnection';
import events from './events';
import webrtcPak from './ExchangeFunctions';
import _  from 'lodash';
import ConfigureSocket from './ConfiguringSocket';
import Dashboard from './Dashboard';


const socket = io('http://pair-server.herokuapp.com');

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			URL: this.props.URL
		};
		this.streamSuccessHandler = this.streamSuccessHandler.bind(this);
		this.setStreamState = this.setStreamState.bind(this);
		this.initiateConnection = this.initiateConnection.bind(this);
	}

	setStreamState(){
		navigator.getUserMedia(
			//configuration
			{
				video:true,
				audio:true,
			},
			//successHandler
			this.streamSuccessHandler,
			//error handler
			console.error)
	}

	streamSuccessHandler(stream){
		this.props.UpdateStream(stream);
		console.log('stream URL sent to store');
	}

	initiateConnection (){
		console.log('inited')
		  //need to get name and id from state
		  var playerInfo = { 
		  	name : "james", 
		  	_id: "thisIsMyUniqueID" 
		  };
		  // var isCaller = false;
		  var socket = io.connect('http://pair-server.herokuapp.com');
		  console.log(socket);
		  var MediaStreamURL = this.state.URL;
		  ConfigureSocket(socket, playerInfo, MediaStreamURL);
	}

	render(){
		return(
			<div>
				<video src={''}></video>
				<button onClick={this.setStreamState}>GETUSERMEDIA</button>
				<button onClick={this.initiateConnection}>InititateCall</button>
				<Dashboard/>
			</div>
		)
	}
}