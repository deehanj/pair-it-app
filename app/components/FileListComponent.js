import React from 'react'
import axios from 'axios'
import { getAllFiles} from '../utils/FileSystemFunction'
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

export default class Files extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dir: props.subDir,
      files: [],
      visible: props.visible,
      text: '',
      level: props.level,
      activeFile: props.activeFile
    }
    this.fetchFiles = this.fetchFiles.bind(this)
    this.setVisible = this.setVisible.bind(this)
  }

  fetchFiles(dir) {
    if (dir.length > 0) {
      getAllFiles(dir + '/')
      .then(filesArr => {
        this.setState({ files: filesArr })
      })
      .catch(err => console.error(err))
    }
  }

  setVisible(filePath) {
      this.setState({ visible: Object.assign({}, this.state.visible, { [filePath]: true })})
  }

  componentDidMount() {
    socket.on('new file is opened', (file) => {
      if (this.props.activeFile.filePath !== file.filePath){
        this.props.openFileFromDriver({ filePath: file.filePath, text: file.text })
      }
    });
    socket.emit('room', {room: this.props.room})

  }
  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.room})
    socket.removeAllListeners('new file is opened')
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.level === 0) {
      const visible = {}
      nextProps.files.forEach(file => {
        const filePath = file.filePath
        visible[filePath] = false
      })
      this.setState({ visible })
    }
    this.fetchFiles(nextProps.subDir)
  }

  render() {
    const files = this.props.files || this.state.files
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
                onClick={() => {
                  this.props.fetchActiveFile(filePath.slice(0, filePath.length - 1), this.props.room)
                }
                }><i className="fa fa-file-text-o" aria-hidden="true"/>{fileName}
              </li>
              :
              // makes a new Files component if fileBool is false
              <li id="folder" key={filePath} onClick={() => this.setVisible(filePath)}>
                <i className="fa fa-folder"/>{fileName}
                {(this.state.visible[filePath] === true) &&

                <Files
                  subDir={filePath}
                  visible={false}
                  level={this.state.level + 1}
                  fetchActiveFile={this.props.fetchActiveFile}
                  room={this.props.room}
                />}
              </li>
          })
        }
      </ul>
    )
  }
}

