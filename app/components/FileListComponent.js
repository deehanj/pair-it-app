import React from 'react'
import axios from 'axios'
import { getAllFiles, readFile } from '../utils/FileSystemFunction'
import { activeFile, addToOpenFiles } from '../reducers/FilesReducer'

import io from 'socket.io-client';

const socket = io('http://pair-server.herokuapp.com');

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
      subFiles: [],
      visible: props.visible,
      text: ''
    }
    this.fetchFiles = this.fetchFiles.bind(this)
    this.setVisible = this.setVisible.bind(this)
    socket.on('new file is opened', (file) => this.props.openFileFromNavigator(file));
  }

  fetchFiles(dir) {
    getAllFiles(dir)
    .then(filesArr => {
      this.setState({ subFiles: filesArr })
    })
    .catch(err => console.error(err))
  }

  setVisible(id) {
    this.setState({ visible: Object.assign({}, this.state.visible, { [id]: true })})
  }

  setInvisible(id) {
    this.setState({ visible: Object.assign({}, this.state.visible, { [id]: false })})
  }

  componentDidMount() {
    this.fetchFiles(this.state.dir)
  }

  render() {
    const files = this.props.files || this.state.subFiles
    return (
      <ul>{this.props.dir}
        {
          files && files.map(file => {
            const fileNameArr = file.filePath.split('/')
            const fileName = fileNameArr[fileNameArr.length - 2]
            // checks if its a file or a directory
            return file.fileBool ?
              // makes a file list item if fileBool is true
              <li key={file.filePath} onClick={() => this.props.fetchActiveFile(file.filePath.slice(0, file.filePath.length - 1))}>{fileName}</li>
              :
              // makes a new Files component if fileBool is false
              <li key={`${file.filePath}-inner`} onClick={() => this.setVisible(file.filePath)}>
                {fileName}
                {this.state.visible[file.filePath] && <Files subDir={file.filePath} visible={false} fetchActiveFile={this.props.fetchActiveFile} />}
              </li>
          })
        }
      </ul>
    )
  }
}

import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    subDir: state.fileSystem.dir,
    files: state.fileSystem.files,
    visible: false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchActiveFile : dir => {
      readFile(dir)
      .then(text => {
        text = text.toString()
        const file = {filePath: dir, text}
        socket.emit('opened file', file)
        dispatch(activeFile(file))
        dispatch(addToOpenFiles(file))
      })
      .catch(error => console.error(error.message))
    },
    openFileFromNavigator : file => {
      dispatch(activeFile(file))
      dispatch(addToOpenFiles(file))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Files)
