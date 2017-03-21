// @flow
import React, { Component } from 'react';
import TextEditor from '../components/TextEditor';
import FileListComponent from '../components/FileListComponent'
import VideoChatContainer from '../VideoChat/VideoChatContainer';
import Dashboard from '../VideoChat/Dashboard';
import GitButtonsContainer from './GitButtonsContainer';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <video id="webchatWindow"></video>
      	<video id="localWebchat"></video>
      	<VideoChatContainer />
        <TextEditor />
        <FileListComponent />
        <GitButtonsContainer />
      </div>
    );
  }
}
