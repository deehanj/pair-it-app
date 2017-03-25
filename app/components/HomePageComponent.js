// @flow
import React, { Component } from 'react';

import TextEditorContainer from '../containers/TextEditorContainer';
import FileListComponent from '../components/FileListComponent'
import FilesContainer from '../containers/FilesContainer'
import GitButtonsContainer from '../containers/GitButtonsContainer';
import ErrorBoxContainer from '../containers/ErrorBoxContainer';
import SuccessBoxContainer from '../containers/SuccessBoxContainer';

export default class HomePageComponent extends Component {

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
            <TextEditorContainer />
            <GitButtonsContainer />
            <ErrorBoxContainer />
            <SuccessBoxContainer />
          </div>
      :
    //NAVIGATOR VIEW
          <div>
            <TextEditorContainer />
          </div>
    }
    </div>
  )
  }
}


