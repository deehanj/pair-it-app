// @flow
import React, { Component } from 'react';
import TextEditor from '../components/TextEditor';
import FileListComponent from '../components/FileListComponent'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <TextEditor />
        <FileListComponent />
      </div>
    );
  }
}
