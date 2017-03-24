// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';

import TextEditor from '../components/TextEditor';
import FileListComponent from '../components/FileListComponent'
import VideoChatContainer from '../VideoChat/VideoChatContainer';
import Dashboard from '../VideoChat/Dashboard';
import FilesContainer from './FilesContainer'
import GitButtonsContainer from './GitButtonsContainer';
import ProjectPage from '../components/ProjectPage';
import ErrorBoxContainer from './ErrorBoxContainer';
import SuccessBoxContainer from './SuccessBoxContainer';

const mapStateToProps = (state) => {
  return {
    role: 'navigator'
  }

}

// const mapDispatchToProps = (dispatch) => {

// }

class HomePage extends Component {


  render() {

//NO ROLES DEFINED

if(this.props.role === ''){
  return(
  <div>
        <video id="webchatWindow"></video>
        <video id="localWebchat"></video>
        <VideoChatContainer />
        <h1>Who is driving?</h1>
  </div>      
)}

//DRIVER VIEW
else if (this.props.role === 'driver'){
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

//NAVIGATOR VIEW
else if (this.props.role === 'navigator')
    return (
      <div>
        <video id="webchatWindow"></video>
      	<video id="localWebchat"></video>
      	<VideoChatContainer />
        <TextEditor />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(HomePage)

