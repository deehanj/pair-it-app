import React, { Component } from 'react';

import TextEditor from './TextEditor';
import FilesContainer from '../containers/FilesContainer'
import GitButtonsContainer from '../containers/GitButtonsContainer';
import ErrorBoxContainer from '../containers/ErrorBoxContainer';
import SuccessBoxContainer from '../containers/SuccessBoxContainer';

export default class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      remoteVideoRendered: false,
    }

  }

  componentDidMount(){
    const LocalVideo = document.getElementById('localWebchat')
    LocalVideo.src = URL.createObjectURL(this.props.localURL);
    LocalVideo.play();
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
        <video id="webchatWindow" />
        <video id="localWebchat" />
        {(this.props.role === '') ?
            <div>
              <h1>Who is driving?</h1>
            </div>
        :
      //DRIVER VIEW
        (this.props.role === 'driver') ?
            <div>
              <FilesContainer />
              <TextEditor />
              <GitButtonsContainer />
              <ErrorBoxContainer />
              <SuccessBoxContainer />
            </div>
        :
      //NAVIGATOR VIEW
            <div>
              <TextEditor />
            </div>
      }
      </div>
    )
    }
}