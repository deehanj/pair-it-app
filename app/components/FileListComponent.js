import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { getAllFiles, readFile } from '../utils/FileSystemFunction'
import { activeFile, addToOpenFiles } from '../reducers/FilesReducer'
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

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dir: props.subDir,
      files: [],
      visible: props.visible,
      text: '',
      level: props.level
    }
    this.fetchFiles = this.fetchFiles.bind(this)
    this.setVisible = this.setVisible.bind(this)
    socket.on('new file is opened', (file) => {
      console.log(file)
      this.props.openFileFromDriver({ filePath: file.filePath, text: file.text })
    });
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
    // console.log(filePath)
    // console.log(this.state.visible)
    // if (this.state.visible[filePath] === false) {
    //   console.log('hit if statement')
      this.setState({ visible: Object.assign({}, this.state.visible, { [filePath]: true })})
    // }
    // else {
    //   console.log('hit else statement')
    //   this.setState({ visible: Object.assign({}, this.state.visible, { [filePath]: false })})
    // }
  }

  componentDidMount() {
    setTimeout(() => socket.emit('room', {room: 'Christine'}), 0)
  }
  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.room})
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
      <ul>{this.props.dir}
        {
          files && files.map(file => {
            const filePath = file.filePath
            const fileNameArr = filePath.split('/')
            const fileName = fileNameArr[fileNameArr.length - 2]
            // checks if its a file or a directory
            return file.fileBool ?
              // makes a file list item if fileBool is true
              <li
                key={filePath}
                onClick={() => {
                  console.log(file)
                  console.log(this.props)
                  this.props.fetchActiveFile(filePath.slice(0, filePath.length - 1), this.props.room)
                  // socket.emit('opened file', { filePath: file.filePath, text: file.text, room: this.props.room })
                }
                }>{fileName}
              </li>
              :
              // makes a new Files component if fileBool is false
              <li key={filePath} onClick={() => this.setVisible(filePath)}>
                {fileName}
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

const mapStateToProps = state => {
  return {
    subDir: state.fileSystem.dir,
    files: state.fileSystem.files,
    visible: true,
    level: 0,
    room: 'Christine'
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Files)
