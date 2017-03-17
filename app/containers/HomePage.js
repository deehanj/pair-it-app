// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import FileListComponent from '../components/FileListComponent'

export default class HomePage extends Component {
  render() {
    return (
    <div>	
      <Home />
      <FileListComponent />
      </div>
    );
  }
}
