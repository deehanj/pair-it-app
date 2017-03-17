import React from 'react'
import axios from 'axios'
import {getAllFiles} from '../utils/FileSystemFunction'

export class ReadFile extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div>{this.props.text}</div>
    )
  }
}

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
    this.readFile = this.readFile.bind(this)
  }

  fetchFiles(dir) {
    console.log('fetch files called', dir)
    getAllFiles(dir)
    .then(filesArr => {
      console.log('getAllFiles', filesArr)
      this.setState({ subFiles: filesArr })
    })
    .catch(err => console.error(err))
  }
  setVisible(id) {
    console.log('set visible')
    this.setState({ visible: Object.assign({}, this.state.visible, { [id]: true })})

  }
  setInvisible(id) {
    console.log('set invisible')
    this.setState({ visible: Object.assign({}, this.state.visible, { [id]: false })})
  }
  readFile(filePath) {
    axios.post('/files/read', {filePath: filePath.slice(0, filePath.length - 1)} )
    .then(response => response.data)
    .then(text => {
      return this.setState({ text })
    })
    .catch(error => console.error(error.message))
  }
  componentDidMount() {
    console.log('did mount')
    this.fetchFiles(this.state.dir)
  }

  componentWillReceiveProps(nextProps){
    console.log('currentProps', this.props, 'nextProps', nextProps)
  }

  componentWillUpdate(nextProps, nextState){
    console.log('nextProps', nextProps)
  }
  render() {
    console.log('props', this.props)
    const files = this.props.files || this.state.subFiles
    // console.log('files in file component', files)
    // console.log('STATE', this.state)
    return (
      <div>
        <ul>
          {
            files && files.map(file => {
              return file.fileBool ?
                <li key={file.filePath} onClick={() => this.readFile(file.filePath)}>{file.filePath}</li> :
                <li key={`${file.filePath}-inner`} onClick={() => this.setVisible(file.filePath)}>
                  {file.filePath}
                  {this.state.visible[file.filePath] && <Files subDir={file.filePath} visible={false} />}
                </li>
            })
          }
        </ul>
        <ReadFile text={this.state.text} />
      </div>
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

export default connect(
  mapStateToProps,
  null,
)(Files)