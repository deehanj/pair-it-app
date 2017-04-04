import React from 'react'
import { connect } from 'react-redux'
import FilesComponent from '../components/FilesComponent'
import { setFileDirAndLoadFiles } from '../actionCreators/FileSystemActionCreators'

const mapStateToProps = state => ({
  dir: state.fileSystem.dir,
  currentBranch: state.GitButtons.currentBranch,
  repoName: state.repo.selectedRepo.name
})

const mapDispatchToProps = dispatch => ({
  dispatchSetFileDirAndLoadFiles: (dir) => dispatch(setFileDirAndLoadFiles(dir)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesComponent)
