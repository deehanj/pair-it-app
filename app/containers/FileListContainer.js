import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { getAllFiles, readFile } from '../utils/FileSystemFunction'
import { activeFile, addToOpenFiles, loadFiles } from '../reducers/FilesReducer'

import FileListComponent from '../components/FileListComponent'

import { serverLocation } from '../utils/server.settings.js'
import io from 'socket.io-client';
const socket = io(serverLocation);

/*
- This component displays the directory file system.
- It recursively creates unordered lists of files that only become visible when clicked on.
- The outermost directory list is updated by the global state redux store.
- The local state is used to pass props to each level's subdirectory in order to make that
particular Files component.
*/


const mapStateToProps = state => {
  return {
    subDir: state.fileSystem.dir,
    files: state.fileSystem.files,
    activeFile: state.fileSystem.activeFile,
    visible: true,
    level: 0,
    room: state.room.name,
    role: state.repo.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchActiveFile : (dir, room) => {
      if (dir.length > 0) {
        readFile(dir)
        .then(text => {
          text = text.toString()
          const file = {filePath: dir, text}
          socket.emit('opened file', { filePath: file.filePath, text: file.text, room: room })
          dispatch(activeFile(file))
          dispatch(addToOpenFiles(file))
        })
        .catch(error => console.error(error.message))
      }
    },
    openFileFromDriver : file => {
      dispatch(activeFile(file))
      dispatch(addToOpenFiles(file))
    },
    loadFiles: files => dispatch(loadFiles(files))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FileListComponent)
