import React from 'react'
import ConfigureSocket from '../VideoChat/ConfiguringSocket'
import events from '../VideoChat/events'
import io from 'socket.io-client'

import { serverLocation } from '../utils/server.settings.js'
const socket = io(serverLocation)

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      repoId: this.props.repoId,
      clickToGoHome: this.props.clickToGoHome,
      collaborator: this.props.collaborator,
      goToPairRoom: this.props.goToPairRoom,
      myName: this.props.myName,
      myId: this.props.myId,
      MediaStreamURL: this.props.URL,
      incomingCall: this.props.incomingCall

      // allProperties: this.props.allProperties
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleIncomingCall = this.handleIncomingCall.bind(this)

  }


  handleClick = () => {
    socket.emit('Pair with me', {room: this.state.repoId, name: this.state.collaborator, url: `/${this.state.myName}`})
    navigator.getUserMedia(
      //configuration
      {
        video:true,
        audio:false,
      },
      //successHandler
      this.localVideoView,
      //error handler
      console.error
    )

  }

  handleIncomingCall = () => {
    console.log('answering incoming call');
    const playerInfo = {
      name: this.state.myName,
      _id: this.state.myId
    };

    const MediaStreamURL = this.state.MediaStreamURL;
    console.log('is this an object?', MediaStreamURL);
    ConfigureSocket(socket, playerInfo, MediaStreamURL);

    socket.emit('startCall', this.state.collaborator);
  }

  getUserMedia = () => {
    navigator.getUserMedia(
			//configuration
			{
				video:true,
				audio:true,
			},
			//successHandler
			this.streamSuccessHandler,
			//error handler
			console.error
		)
  }

  streamSuccessHandler(stream) {
    this.props.UpdateStream(stream);
    // this.initiateConnection();
  }

  localVideoView(stream) {
    // const localVideo = document.getElementById('localWebchat');
    // console.log(localVideo);
    // localVideo.src = URL.createObjectURL(stream);
    // // localVideo.onloadedmetadata(play());
    // localVideo.play();
  }


  render(){
    console.log('Props: ', this.props);
    return (
      <div>
      <div key={this.state.collaborator} onClick={this.handleClick}>{this.state.collaborator}</div>
      {
        this.props.incomingCall && <button onClick={() => this.handleIncomingCall(this.state.collaborator)}>Answer, begin pair</button>
      }
      </div>
    )
  }
}
