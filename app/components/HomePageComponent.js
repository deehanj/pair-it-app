
// @flow
import React, { Component } from 'react';
import TextEditorContainer from '../containers/TextEditorContainer';
import FilesContainer from '../containers/FilesContainer'
import GitButtonsContainer from '../containers/GitButtonsContainer';
import ErrorBoxContainer from '../containers/ErrorBoxContainer';
import SuccessBoxContainer from '../containers/SuccessBoxContainer';
import{ serverLocation }from '../utils/server.settings'
import io from 'socket.io-client'

const socket = io(serverLocation)

export default class HomePageComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      remoteVideoRendered: false,
    }
    this.setSelfToDriver = this.setSelfToDriver.bind(this)
    this.setPartnerToDriver = this.setPartnerToDriver.bind(this)

    socket.on('partner picked self as driver', () => {
      this.props.setDriverToPartner()
    })

    socket.on('partner picked you as driver', () => {
      this.props.setDriverToMyself()
    })

  }

  componentDidMount(){
    const LocalVideo = document.getElementById('localWebchat')
    LocalVideo.src = URL.createObjectURL(this.props.localURL);
    LocalVideo.play();
    console.log(this.props.room)
    setTimeout(()=>{
      socket.emit('room', {room: this.props.room,})
    }, 0)



    //listen to set to driver

    //listen to set to navigator
  }

  setSelfToDriver(){
    this.props.setDriverToMyself()
    socket.emit('driver selected', {room: this.props.room})
  }

  setPartnerToDriver(){
    this.props.setDriverToPartner()
    socket.emit('navigator selected', {room: this.props.room})
  }

  componentDidUpdate(){
    if (this.props.remoteURL.length && this.state.remoteVideoRendered === false){
      const RemoteVideo = document.getElementById('webchatWindow');
      this.setState({remoteVideoRendered: true});
      RemoteVideo.src = this.props.remoteURL;
      RemoteVideo.play();
    }
  }

  render() {
    console.log(this.state)
    return (
      //NO ROLES DEFINED
      <div>
        <video id="webchatWindow" onClick={this.setPartnerToDriver} />
        <video id="localWebchat" onClick={this.setSelfToDriver} />
        {(this.props.role === '') ?
            <div>
              <h1>Who is driving?</h1>
              <p>Click the video to choose.</p>
            </div>
        :
      //DRIVER VIEW
        (this.props.role === 'driver') ?
            <div>
              <FilesContainer />
              <TextEditorContainer />
              <GitButtonsContainer />
              <ErrorBoxContainer />
              <SuccessBoxContainer />
            </div>
        :
      //NAVIGATOR VIEW
            <div>
              <FilesContainer />
              <TextEditorContainer />
              <FilesContainer />
            </div>
      }
      </div>
    )
    }
}
