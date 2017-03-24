// @flow
import React, { Component } from 'react';
import TextEditor from '../components/TextEditor';
import FileListComponent from '../components/FileListComponent'
import VideoChatContainer from '../VideoChat/VideoChatContainer';
import Dashboard from '../VideoChat/Dashboard';
import FilesContainer from './FilesContainer'
import GitButtonsContainer from './GitButtonsContainer';
import ProjectPage from '../components/ProjectPage';
import io from 'socket.io-client'
import { serverLocation } from '../utils/server.settings'
const socket = io(serverLocation)
import ErrorBoxContainer from './ErrorBoxContainer';
import SuccessBoxContainer from './SuccessBoxContainer';

export default class HomePage extends Component {

  componentDidMount() {
    setTimeout(() => socket.emit('room', {room: 'Christine'}), 0)
  }
  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.room})
  }
  render() {
    return (
      <div>
        <video id="webchatWindow"></video>
      	<video id="localWebchat"></video>
      	<VideoChatContainer />
        <FilesContainer />
        <TextEditor />
        <GitButtonsContainer />
        <ErrorBoxContainer />
        <SuccessBoxContainer />
      </div>
    );
  }
}
