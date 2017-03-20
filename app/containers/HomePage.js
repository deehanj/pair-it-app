// @flow
import React, { Component } from 'react';
import TextEditor from '../components/TextEditor';
import FileListComponent from '../components/FileListComponent'
import VideoChatContainer from '../VideoChat/VideoChatContainer';
import Login from '../components/Login';
import WhoAmI from '../components/WhoAmI';
import {connect} from 'react-redux';

const SignIn = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <SignIn />
      	<video id="webchatWindow"></video>
      	<VideoChatContainer />
        <TextEditor />
        <FileListComponent />
      </div>
    );
  }
}
