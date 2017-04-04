// // @flow

import React from 'react'
import {connect} from 'react-redux'

import { setUser } from '../actionCreators/UserActionCreators'
import { updateOpenFiles, closeFile, saveNewFile, switchTab, setActiveFileAndReturnFileAndIndex, addToOpenFilesAndSetActive, setFileDirAndLoadFiles, driverSave, closeTab, wholeFile, activeFile} from '../actionCreators/FileSystemActionCreators'
import { openGitMenu, closeGitMenu } from '../actionCreators/GitButtonsActionCreators'

import TextEditorComponent from '../components/TextEditorComponent'

const mapStateToProps = (state) => {
	return {
		activeFile: state.fileSystem.activeFile,
		openFiles: state.fileSystem.openFiles,
		dir: state.fileSystem.dir,
		room: state.room.name,
		role: state.repo.role,
    selectedTab: state.fileSystem.selectedTab
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchWholeFile: (file) => dispatch(wholeFile(file)),
		dispatchSetActiveFileAndReturnFileAndIndex: (file, index) => dispatch(setActiveFileAndReturnFileAndIndex(file, index)),
		dispatchUsername: (username) => dispatch(setUser(username)),
		dispatchUpdateOpenFiles: (file) => dispatch(updateOpenFiles(file)),
		dispatchAddToOpenFilesAndSetActive: () => dispatch(addToOpenFilesAndSetActive()),
		dispatchCloseFile: (file) => dispatch(closeFile(file)),
		dispatchSetFileDirAndLoadFiles: (dir) => dispatch(setFileDirAndLoadFiles(dir)),
		dispatchSaveNewFile: (file) => dispatch(saveNewFile(file)),
		dispatchDriverSave: (filePath, code, isNewFile) => dispatch(driverSave(filePath, code, isNewFile)),
		dispatchCloseTab: (file, openFiles) => dispatch(closeTab(file, openFiles)),
		dispatchOpenGitMenu: () => dispatch(openGitMenu(true)),
    dispatchSwitchTab: (index) => dispatch(switchTab(index)),
    dispatchActiveFile: (file) => dispatch(activeFile(file)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorComponent)
