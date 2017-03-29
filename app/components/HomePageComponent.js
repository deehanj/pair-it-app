
// @flow
import React, { Component } from 'react';
import TextEditorContainer from '../containers/TextEditorContainer';
import FilesContainer from '../containers/FilesContainer'
import FileListContainer from '../containers/FileListContainer'
import Drawer from 'material-ui/Drawer'
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
      playerInfo:{
          name: props.myName,
          _id: props.id,
          id: socket.id
        }
    }
    this.setSelfToDriver = this.setSelfToDriver.bind(this)
    this.setPartnerToDriver = this.setPartnerToDriver.bind(this)
    this.returnToCollaborators = this.returnToCollaborators.bind(this);
  }

  componentDidMount(){
    const LocalVideo = document.getElementById('localWebchat')
    LocalVideo.src = URL.createObjectURL(this.props.localURL);
    LocalVideo.play();
    socket.on('partner picked self as driver', () => {
      this.props.setDriverToPartner()
    })
    socket.on('partner picked you as driver', () => {
      this.props.setDriverToMyself()
    })
    socket.on('peer connection severed', () => {
          URL.revokeObjectURL(this.props.URL);
          URL.revokeObjectURL(this.props.remoteURL)
    })
    setTimeout(()=>{
      socket.emit('room', {room: this.props.room,})
    }, 0)
  }

  componentWillUnmount() {
    window.pc.close();
    socket.removeAllListeners('partner picked self as driver')
    socket.removeAllListeners('partner picked you as driver')
    socket.removeAllListeners('peer connection severed')
    socket.emit('leaving room', {room: this.props.room, playerInfo: this.state.playerInfo})
  }

  componentDidUpdate(){
    if (this.props.remoteURL.length && this.state.remoteVideoRendered === false){
      const RemoteVideo = document.getElementById('webchatWindow');
      this.setState({remoteVideoRendered: true});
      RemoteVideo.src = this.props.remoteURL;
      RemoteVideo.play();
    }
  }

  setSelfToDriver(){
    if (this.props.role === ''){
      this.props.setDriverToMyself()
      socket.emit('driver selected', {room: this.props.room})
    }
  }

  setPartnerToDriver(){
    if (this.props.role === ''){
      this.props.setDriverToPartner()
      socket.emit('navigator selected', {room: this.props.room})
    }
  }


  returnToCollaborators() {
    this.props.backToCollaborators();
    this.props.makeAvailable(this.props.myName)
    this.props.removeRole()
    socket.emit('closed connection', {room: this.props.room})
    socket.emit('set available', { room: this.props.repoId, name: this.props.myName })
    URL.revokeObjectURL(this.props.remoteURL)
    this.props.localURL.getVideoTracks()[0].stop();
    this.props.URL.getVideoTracks()[0].stop();
    this.props.URL.getAudioTracks()[0].stop();
    this.props.clearURLs();
    this.props.clearFileSystem();


    this.setState({remoteVideoRendered: false});
  }

  render() {
    return (
      //NO ROLES DEFINED
      <div>
      {(this.props.role === '') ?
            <div className="col-sm-12" id="set-driver">
                <h1 className="text-center">Who is driving?</h1>
                <p className="text-center">Click the video to choose.</p>
            </div>
        : <div></div>}

        <div
          id="video-container"
          className={this.props.role === '' ? "col-sm-12 video-padding" : "col-sm-4 text-editor"}>
          <video
            id="webchatWindow"
            className={this.props.role === '' ? "set-driver-view" : "webchatWindow-text-editor"}
            onClick={this.setPartnerToDriver} />
          <video
            id="localWebchat"
            className={this.props.role === '' ? "set-driver-view" : "localWebchat-text-editor"}
            onClick={this.setSelfToDriver} />
        </div>

        {(this.props.role === '') ?
        <footer>
            <div className="collab-footer" onClick={this.returnToCollaborators}><h3><i className="fa fa-arrow-left" />   Return to Collaborators Page</h3></div>
        </footer>
        :
      //DRIVER VIEW
          (this.props.role === 'driver') ?
            <div>
              <TextEditorContainer gitOpen={this.props.openGitMenu}/>
              <FilesContainer />
                <div className="back-arrow" onClick={this.returnToCollaborators}><h3><i className="fa fa-arrow-left" />   Return to Collaborators Page</h3></div>
              <Drawer
                open={this.props.gitOpen}
                docked={false}
                width={400}
                openSecondary={true}
                >
                <div>
                <GitButtonsContainer />
                </div>
              </Drawer>
            </div>
        :
      //NAVIGATOR VIEW
            <div>
              <TextEditorContainer />
              <FileListContainer/>
              <footer>
               <div className="back-arrow" onClick={this.returnToCollaborators}><h3><i className="fa fa-arrow-left" />   Return to Collaborators Page</h3></div>
              </footer>
            </div>
      }


      </div>
    )
    }
}
