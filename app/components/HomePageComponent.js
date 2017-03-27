
// @flow
import React, { Component } from 'react';
import TextEditorContainer from '../containers/TextEditorContainer';
import FilesContainer from '../containers/FilesContainer'
import FileListContainer from '../containers/FileListContainer'
import GitButtonsContainer from '../containers/GitButtonsContainer';
import ErrorBoxContainer from '../containers/ErrorBoxContainer';
import SuccessBoxContainer from '../containers/SuccessBoxContainer';
import{ serverLocation }from '../utils/server.settings'
import io from 'socket.io-client'
// import {pc} from '../utils/ExchangeFunctions'

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

    this.returnToCollaborators = this.returnToCollaborators.bind(this);

    socket.on('peer connection severed', () => {
      // document.getElementById('webchatWindow').style.visibility = 'hidden';
          URL.revokeObjectURL(this.props.URL);
          URL.revokeObjectURL(this.props.remoteURL)
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
    // document.getElementById('webchatWindow').style.visibility = 'visible';
  
    //listen to set to driver

    //listen to set to navigator
  }

  setSelfToDriver(){
    this.props.setDriverToMyself()
    socket.emit('driver selected', {room: this.props.room})
    document.getElementById('webchatWindow').className="webchatWindow-text-editor"
    document.getElementById('localWebchat').className="localWebchat-text-editor"
    document.getElementById('video-container').className="col-sm-4 text-editor"
  }

  setPartnerToDriver(){
    this.props.setDriverToPartner()
    socket.emit('navigator selected', {room: this.props.room})
    document.getElementById('localWebchat').className="localWebchat-text-editor"
    document.getElementById('webchatWindow').className="webchatWindow-text-editor"
    document.getElementById('video-container').className="col-sm-4 text-editor"
  }

  componentDidUpdate(){
    if (this.props.remoteURL.length && this.state.remoteVideoRendered === false){
      const RemoteVideo = document.getElementById('webchatWindow');
        this.setState({remoteVideoRendered: true});
        RemoteVideo.src = this.props.remoteURL;
        RemoteVideo.play();
      
    }
  }

  returnToCollaborators() {
    this.props.backToCollaborators();
    socket.emit('closed connection', {room: this.props.room})
    URL.revokeObjectURL(this.props.remoteURL)
    this.props.localURL.getVideoTracks()[0].stop();
    this.props.URL.getVideoTracks()[0].stop();
    this.props.URL.getAudioTracks()[0].stop();
    this.props.clearURLs();
    this.setState({remoteVideoRendered: false});
  }

  componentWillUnmount() {
    window.pc.close();
    window.pc = null;
  }

  render() {
    console.log(this.state)
    return (
      //NO ROLES DEFINED
      <div>
      {(this.props.role === '') ?
            <div className="col-sm-12" id="set-driver">
                <h1 className="text-center">Who is driving?</h1>
                <p className="text-center">Click the video to choose.</p>
            </div>
        : <div></div>}
        <div id="video-container" className="col-sm-12 video-padding">
          <video id="webchatWindow" className="set-driver-view" onClick={this.setPartnerToDriver} />
          <video id="localWebchat" className="set-driver-view" onClick={this.setSelfToDriver} />
        </div>

        <footer>
          <button onClick={this.returnToCollaborators}>BACK TO COLLABORATORS PAGE</button>
        </footer>    
        {(this.props.role === '') ?
           null
        : 
      //DRIVER VIEW
          (this.props.role === 'driver') ?
            <div>
              <TextEditorContainer />
              <FilesContainer />
              <GitButtonsContainer />
              <ErrorBoxContainer />
              <SuccessBoxContainer />
            </div>
        :
      //NAVIGATOR VIEW
            <div>
              <FileListContainer/>
              <TextEditorContainer />
            </div>
      }
      </div>
    )
    }
}
