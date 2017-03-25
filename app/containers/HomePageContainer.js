// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';

import HomePage from '../components/HomePageComponent'

const mapStateToProps = (state) => {
  return {
    URL: state.VideoChat.URL,
    localURL: state.VideoChat.localURL,
    remoteURL: state.VideoChat.remoteURL,
    role: '',
    collaborator: state.repo.collaborator,
  }

}

export default connect(mapStateToProps, null)(HomePage)
