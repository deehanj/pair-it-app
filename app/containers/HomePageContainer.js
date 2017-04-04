// @flow
import React, { Component } from 'react';
import { setRoleToDriver, setRoleToNavigator, clearRole } from '../actionCreators/RepoActionCreators';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import {clearAllURLs} from '../actionCreators/VideoChatActionCreators'
import {setAvailable} from '../reducers/user'
import { closeGitMenu, clearGit } from '../actionCreators/GitButtonsActionCreators'
import {clearFileSystem} from '../actionCreators/FileSystemActionCreators'

import HomePageComponent from '../components/HomePageComponent'

const mapStateToProps = (state) => {
  return {
    URL: state.VideoChat.URL,
    localURL: state.VideoChat.localURL,
    remoteURL: state.VideoChat.remoteURL,
    role: state.repo.role,
    collaborator: state.repo.collaborator,
    room: state.room.name,
    myName: state.user.gitInfo.login,
    repoId: state.repo.selectedRepo.id,
    repoName: state.repo.selectedRepo.name,
    gitOpen: state.GitButtons.open,
    id: state.user.gitInfo.id,

	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDriverToMyself: () => {
      //if driver name is mine, then set my role to 'driver'
      dispatch(setRoleToDriver())
      //emit to set other person to nav
    },
    setDriverToPartner: () => {
      //if driver name is yours, then set my role to 'navigator'
      dispatch(setRoleToNavigator())
      //emit to set other person to drive
    },
    backToCollaborators: () => {
      dispatch(push('/collaborators'))
    },
    clearURLs: () => {
      dispatch(clearAllURLs())
    },
    makeAvailable: (name) => {
      dispatch(setAvailable(name))
    },
    removeRole: () => {
      dispatch(clearRole())
    },
    dispatchCloseGitMenu: () => dispatch(closeGitMenu(false)),
    clearFileSystem: () => dispatch(clearFileSystem()),
    clearGit: () => dispatch(clearGit()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent)
