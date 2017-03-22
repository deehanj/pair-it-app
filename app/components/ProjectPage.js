import React from 'react'
import { connect } from 'react-redux'
import { setFileDir } from '../reducers/FilesReducer'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setRootDirectory: dir => dispatch(setFileDir(dir))
})

class ProjectPage extends React.Component {

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
    this.props.setRootDirectory(this.state.dir)
  }

  selectFile(ev) {
    this.setState({ dir: ev.target.files[0].path })
  }

  render() {
    return (
      <div>
        <div id="github">
          <h3>Select a repo from Github</h3>
          <button>Select</button>
        </div>
        <h4>Or</h4>
        <div id="local">
          <h3>Select a repo from your Local Machine</h3>
          <input type="file" ref="local" onChange={this.selectFile} /><br/>
        </div>
        <h4>Or</h4>
        <div id="waiting">
          <h3>Pair with someone on their repo</h3>
          <button>Select</button>
        </div>
        <button onClick={this.onSubmit}>Pair It!</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
