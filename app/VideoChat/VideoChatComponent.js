import React from 'react';
import io from 'socket.io-client';

import events from './events';
import webrtcPak from './ExchangeFunctions';
import _  from 'lodash';
import ConfigureSocket from './ConfiguringSocket';
import Dashboard from './Dashboard';


// const socket = io('http://pair-server.herokuapp.com');
// const socket = io('http://192.168.5.93:1337');
const socket = io('http://192.168.1.155:1337');


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
	}

	streamSuccessHandler(stream){
		this.props.UpdateStream(stream);
		var localVideo = document.getElementById('localWebchat');
		console.log(localVideo);
		localVideo.src = URL.createObjectURL(stream);
		// localVideo.onloadedmetadata(play());
		localVideo.play();
	}

	initiateConnection (){

		  //need to get name and id from state
		  var playerInfo = { 
		  	name : "james", 
		  	_id: "thisIsMyUniqueID" 
		  };
		  // var socket = io.connect('http://pair-server.herokuapp.com');
		  // const socket = io('http://192.168.5.93:1337');
		  const socket = io('http://192.168.1.155:1337');
		  var MediaStreamURL = this.state.URL;
		  ConfigureSocket(socket, playerInfo, MediaStreamURL);
	}

	render(){

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