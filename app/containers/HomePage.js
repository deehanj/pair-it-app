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

import events from '../VideoChat/events'


const mapStateToProps = (state) => {
  return {
    role: '',
    collaborator: state.repo.collaborator
  }

}

// const mapDispatchToProps = (dispatch) => {

// }

class HomePage extends Component {

  componentDidMount(){
    //if you want to try and do this make sure that you are setting the store with the collaborator name in the CollaboratorRow Container
    //this breaks heroku, when you move from one container to the next
    // events.trigger('startCall', this.props.collaborator)
  }


  render() {
    return (
      //NO ROLES DEFINED
      <div>
        <video id="webchatWindow"></video>
        <video id="localWebchat"></video>
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

export default connect(mapStateToProps, null)(HomePage)
