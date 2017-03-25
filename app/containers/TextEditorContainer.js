// // @flow

import React from 'react'
import {connect} from 'react-redux'

import { setUser } from '../reducers/user'
import { updateOpenFiles, closeFile, saveNewFile, setActiveFileAndReturnFileAndIndex, addToOpenFilesAndSetActive, setFileDirAndLoadFiles, driverSave, closeTab } from '../reducers/FilesReducer'

import TextEditorComponent from '../components/TextEditorComponent'

const mapStateToProps = (state) => {
	return {
		activeFile: state.fileSystem.activeFile,
		openFiles: state.fileSystem.openFiles,
		dir: state.fileSystem.dir,
		room: 'Christine',
		role: 'driver'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetActiveFileAndReturnFileAndIndex: (file, index) => dispatch(setActiveFileAndReturnFileAndIndex(file, index)),
		dispatchUsername: (username) => dispatch(setUser(username)),
		dispatchUpdateOpenFiles: (file) => dispatch(updateOpenFiles(file)),
		dispatchAddToOpenFilesAndSetActive: () => dispatch(addToOpenFilesAndSetActive()),
		dispatchCloseFile: (file) => dispatch(closeFile(file)),
		dispatchSetFileDirAndLoadFiles: (dir) => dispatch(setFileDirAndLoadFiles(dir)),
		dispatchSaveNewFile: (file) => dispatch(saveNewFile(file)),
		dispatchDriverSave: (filePath, code, isNewFile) => dispatch(driverSave(filePath, code, isNewFile)),
		dispatchCloseTab: (file, openFiles) => dispatch(closeTab(file, openFiles))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorComponent)
