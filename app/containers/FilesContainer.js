import React from 'react'
import { connect } from 'react-redux'
import FileList from '../components/FileListComponent'
import { getAllFiles } from '../utils/FileSystemFunction'
import { setFileDir, loadFiles } from '../reducers/FilesReducer'

const mapStateToProps = state => ({
  dir: state.fileSystem.dir
})

const mapDispatchToProps = dispatch => ({
  setRootDirectory: dir => {
    if (dir.length > 0) {
      getAllFiles(dir + '/')
      .then(result => {
        dispatch(setFileDir(dir))
        dispatch(loadFiles(result))
      })
      .catch(error => console.error(error.message))
    }
  }
})

class FileContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dir: ''
    }
    this.selectFile = this.selectFile.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.refs.local.setAttribute('webkitdirectory', true)
    this.refs.local.setAttribute('directory', true)
  }

  // componentWillReceiveProps(nextProps) {
  //   getAllFiles(nextProps.dir)
  //   .then(result => {
  //     store.dispatch(setFileDir(nextProps.dir))
  //     store.dispatch(loadFiles(result))
  //   })
  //   .catch(error => console.error(error.message))
  // }

  onSubmit() {
    this.props.setRootDirectory(this.state.dir)
  }

  selectFile(ev) {
    this.setState({ dir: ev.target.files[0].path })
  }

  render() {
    return (
      <div>
        <div>
          <input type="file" ref="local" onChange={this.selectFile} />
          <button onClick={this.onSubmit}>Pair It!</button>
        </div>
        <FileList />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileContainer)
