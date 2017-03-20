import React from 'react';
import io from 'socket.io-client';
import init from './InitiateConnection';
import events from './events';
import webrtcPak from './ExchangeFunctions';
import _  from 'lodash';
import ConfigureSocket from './ConfiguringSocket';
import Dashboard from './Dashboard';


// const socket = io('http://pair-server.herokuapp.com');
const socket = io('http://192.168.5.93:1337');


export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			URL: ''
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

	componentWillReceiveProps(nextProps){
		this.setState({URL: nextProps.URL})
		console.log(this.state.URL);
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
		  // var socket = io.connect('http://pair-server.herokuapp.com');
		  const socket = io('http://192.168.5.93:1337');
		  console.log(socket);
		  var MediaStreamURL = this.state.URL;
		  console.log('this is the medai stream we want to pass', MediaStreamURL);
		  ConfigureSocket(socket, playerInfo, MediaStreamURL);
	}

	render(){
		console.log('this is th eporps of the videochetComponent', this.props)
		console.log('state', this.state);
		return(
			<div>
				<video src={''}></video>
				<button onClick={this.setStreamState}>GETUSERMEDIA</button>
				<button onClick={this.initiateConnection}>InititateCall</button>
				<Dashboard URL = {this.props.URL}/>
			</div>
		)
	}
}