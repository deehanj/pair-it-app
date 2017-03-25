// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';

<<<<<<< HEAD
import HomePage from '../components/HomePageComponent'

const mapStateToProps = (state) => {
  return {
    URL: state.VideoChat.URL,
    localURL: state.VideoChat.localURL,
    remoteURL: state.VideoChat.remoteURL,
    role: '',
    collaborator: state.repo.collaborator,
=======
import HomePageComponent from '../components/HomePageComponent';

const mapStateToProps = (state) => {
  return {
    role: 'driver'
>>>>>>> f63e93cd317499cd9462615a86ea3cb9989b8af7
  }

}

<<<<<<< HEAD
export default connect(mapStateToProps, null)(HomePage)
=======
export default connect(mapStateToProps, null)(HomePageComponent)

>>>>>>> f63e93cd317499cd9462615a86ea3cb9989b8af7
