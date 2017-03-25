// @flow
import React, { Component } from 'react';
import { setRoleToDriver, setRoleToNavigator } from '../reducers/repo';
import {connect} from 'react-redux';

import HomePageComponent from '../components/HomePageComponent'

const mapStateToProps = (state) => {
  return {
    URL: state.VideoChat.URL,
    localURL: state.VideoChat.localURL,
    remoteURL: state.VideoChat.remoteURL,
    role: '',
    collaborator: state.repo.collaborator,
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDriverToMe: () => {
      //if driver name is mine, then set my role to 'driver'
      dispatch(setRoleToDriver())
      //emit to set other person to nav
    },
    setDriverToYou: () => {
      //if driver name is yours, then set my role to 'navigator'
      dispatch(setRoleToNavigator())
      //emit to set other person to drive
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent)
