import React from 'react'
import { connect } from 'react-redux'

import FileListContainer from '../containers/FileListContainer'

export default class FilesComponent extends React.Component {

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

  onSubmit() {
    this.props.dispatchSetFileDirAndLoadFiles(this.state.dir)
  }

  selectFile(ev) {
    this.setState({ dir: ev.target.files[0].path })
  }

  render() {
    return (
      <div id="file-container" className="col-sm-4">
        <div>
          <input type="file" ref="local" onChange={this.selectFile} />
          <button onClick={this.onSubmit}>Pair It!</button>
        </div>
        <FileListContainer />
      </div>
    )
  }
}
