import React from 'react'
import axios from 'axios'
import { getAllFiles} from '../utils/FileSystemFunction'
import { serverLocation } from '../utils/server.settings.js'

import io from 'socket.io-client';

const socket = io(serverLocation);

/*
- This component displays the directory file system.
- It recursively creates unordered lists of files that only become visible (or invisible) when clicked on.
- The file objects are held in global state (state.fileSystem).
*/

export default class Files extends React.Component {
  constructor(props) {
    super(props)
    this.onFileClick = this.onFileClick.bind(this)
    this.setVisible = this.setVisible.bind(this)
  }

  onFileClick(dir, room, role) {
    var i = -1;
    const index = this.props.openFiles.forEach((file, index) => {
      if (file.filePath === dir) i = index
    })
    if (i === -1) {
      this.props.fetchActiveFile(dir, room, role)
      this.props.switchTab(this.props.openFiles.length)
    }
    else {
      if (this.props.activeFile.filePath !== dir) {
        this.props.activeFile(this.props.openFiles[i])
      }
      this.props.switchTab(i)
    }
  }

  setVisible(filePath) {
    this.props.toggleVisibility(filePath)
  }

  componentDidMount() {
    socket.on('new file is opened', (file) => {
      if ((this.props.activeFile && this.props.activeFile.filePath !== file.filePath) && this.props.role === 'navigator'){
        this.props.openFileFromDriver({ filePath: file.filePath, text: file.text })
      }
    });
    if (this.props.files && this.props.files.length === 0) {
      socket.on('partner selected files', (data) => {
          this.props.loadFiles(data.files)
      })
    }
    socket.emit('room', {room: this.props.room})
  }
  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.room})
    socket.removeAllListeners('new file is opened')
  }

  componentWillReceiveProps(nextProps) {
    const theFiles = nextProps.files
    if (this.props.role === 'driver' && this.props.files.length === 0) {
      setTimeout(() => socket.emit('send file tree', {files: theFiles, room: this.props.room}), 3000)
    }
  }

  render() {
    const files = this.props.files
    return (
      <ul id="files">{this.props.dir}
        {
          files && files.map(file => {
            const filePath = file.filePath
            const fileNameArr = filePath.split('/')
            const fileName = fileNameArr[fileNameArr.length - 2]
            // checks if its a file or a directory
            return file.fileBool ?
              // makes a file list item if fileBool is true
              <li
                id="single-file"
                key={filePath}
                onClick={() => this.onFileClick(filePath.slice(0, filePath.length - 1), this.props.room, this.props.role)}><i className="fa fa-file-text-o" aria-hidden="true"/>  {fileName}
              </li>
              :
              // makes a new Files component if fileBool is false
              <li id="folder" key={filePath}>
                <div onClick={() => this.setVisible(filePath)}><i className="fa fa-folder"/>  {fileName}  </div>
                {(this.props.isVisible[filePath] === true) &&
                <Files
                  subDir={filePath}
                  files={file.files}
                  role= {this.props.role}
                  room={this.props.room}
                  fetchActiveFile={this.props.fetchActiveFile}
                  isVisible={this.props.isVisible}
                  toggleVisibility={this.props.toggleVisibility}
                  openFiles={this.props.openFiles}
                  switchTab= {this.props.switchTab}
                />}
              </li>
          })
        }
      </ul>
    )
  }
}

