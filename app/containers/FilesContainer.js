import React from 'react'
import { connect } from 'react-redux'
import FilesComponent from '../components/FilesComponent'
import { setFileDirAndLoadFiles } from '../reducers/FilesReducer'

const mapStateToProps = state => ({
  dir: state.fileSystem.dir
})

const mapDispatchToProps = dispatch => ({
  dispatchSetFileDirAndLoadFiles: (dir) => dispatch(setFileDirAndLoadFiles(dir)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesComponent)
