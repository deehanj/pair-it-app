// // @flow

import React from 'react'
import Promise from 'bluebird'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import brace from 'brace'
import AceEditor from 'react-ace'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { setUser } from '../reducers/user'
import { serverLocation } from '../utils/server.settings.js'
import { activeFile, updateOpenFiles, addToOpenFiles, closeFile, setFileDir, loadFiles, saveNewFile, setActiveFileAndReturnFileAndIndex, addToOpenFilesAndSetActive, setFileDirAndLoadFiles, driverSave, closeTab } from '../reducers/FilesReducer'
import { writeFile } from '../utils/FileSystemFunction'
import { getAllFiles } from '../utils/FileSystemFunction'

import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'


const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		activeFile: state.fileSystem.activeFile,
		openFiles: state.fileSystem.openFiles,
    dir: state.fileSystem.dir,
		room: 'Christine',
    role: 'navigator'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetActiveFileAndReturnFileAndIndex: (file, index) => dispatch(setActiveFileAndReturnFileAndIndex(file, index)),
		dispatchUsername: (username) => dispatch(setUser(username)),
		dispatchUpdateOpenFiles: (file) => dispatch(updateOpenFiles(file)),
    dispatchAddToOpenFilesAndSetActive: () => dispatch(addToOpenFilesAndSetActive()),
		dispatchCloseFile: (file) => dispatch(closeFile(file)),
    dispatchSetFileDirAndLoadFiles: (dir) => dispatch(setFileDirAndLoadFiles(dir)),
    dispatchSaveNewFile: (file) => dispatch(saveNewFile(file)),
    dispatchDriverSave: (filePath, code, isNewFile) => dispatch(driverSave(filePath, code, isNewFile)),
    dispatchCloseTab: (file, openFiles) => dispatch(closeTab(file, openFiles))
	}
}

class TextEditorContainer extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			code: '',
			openFiles:[],
			tabIndex: 0,
		}

		socket.on('receive code', (payload) => this.setState({ code: payload.code }))
		socket.on('change to new tab', (payload) => {
      Promise.resolve(this.props.dispatchSetActiveFileAndReturnFileAndIndex(this.props.openFiles[payload.index]))
      .then(() => this.props.dispatchUpdateOpenFiles(payload.file))
      .then(() => this.setState({tabIndex: payload.index}))
      .catch(error => console.error(error.message))
    })

    socket.on('new tab added', payload => {
      if (payload.length > this.props.openFiles.length) this.props.dispatchAddToOpenFilesAndSetActive()
    })
    socket.on('a tab was closed', payload => {
     if (this.props.openFiles.filter(file => file.filePath === payload.fileToClose.filePath).length > 0) {
       Promise.resolve(this.props.dispatchCloseFile(payload.fileToClose))
       .then(() => this.props.dispatchSetActiveFileAndReturnFileAndIndex(payload.fileToActive) )
       .then(() => this.setState({tabIndex: payload.index}))
       .catch(error => console.error(error.message))
     }
   })
    socket.on('file was saved', (payload) => {
      if (this.props.activeFile.text !== payload.text) {
        const file = { filePath: payload.filePath, text: payload.text }
        Promise.resolve(this.props.dispatchUpdateOpenFiles(file))
        .then(() => this.props.dispatchSetActiveFileAndReturnFileAndIndex(file))
        .then(() => this.props.dispatchSaveNewFile(file))
        .catch(error => console.error(error.message))
      }
    })

    this.handleSelect = this.handleSelect.bind(this)
    this.codeIsHappening = this.codeIsHappening.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onAddNewTab = this.onAddNewTab.bind(this)
    this.onCloseTab = this.onCloseTab.bind(this)
	}

  componentDidMount() {
  	// this.props.dispatchUsername('Christine')
    // can put a promise here and get rid of the setTimeout
  	setTimeout(() => socket.emit('room', {room: this.props.room}), 0)
  }

  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.room})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
    	code: nextProps.activeFile.text,
    	tabIndex: nextProps.openFiles.length - 1
    })
    this.codeIsHappening(nextProps.activeFile.text)
  }

  codeIsHappening(newCode) {
    this.setState({ code: newCode })
    socket.emit('coding event', {code: newCode, room: this.props.room})
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last)
    const file = this.props.activeFile
    file.text = this.state.code
    socket.emit('tab changed', {file: file, index: index, room: this.props.room})
    Promise.resolve(this.props.dispatchUpdateOpenFiles(file))
    .then(() => this.props.dispatchSetActiveFileAndReturnFileAndIndex(this.props.openFiles[index]))
    .then(() => this.setState({tabIndex: index}))
	  .catch(error => console.error(error.message))
  }

  onSave(ev) {
    ev.preventDefault()
    let filePath
    let isNewFile = false
    if (this.props.activeFile.filePath.length > 0) {
      filePath = this.props.activeFile.filePath
    } else {
      filePath = `${this.props.dir}/${ev.target.filename.value}.js`
      isNewFile = true
    }
    this.props.dispatchDriverSave(filePath, this.state.code, isNewFile)
    .then(() => this.props.dispatchSetFileDirAndLoadFiles(this.props.dir))
    .then(() => socket.emit('save file', { filePath: filePath, text: this.state.code, room: this.props.room }))
    .catch(error => console.error(error.message))
  }

  onAddNewTab() {
    Promise.resolve(this.props.dispatchAddToOpenFilesAndSetActive())
    .then(() => socket.emit('added a tab', {length: this.props.openFiles.length, room: this.props.room}))
  }

  onCloseTab(file){
    this.props.dispatchCloseTab(file, this.props.openFiles)
    .spread((fileToActive, index) => {
      console.log('after .then', file, index)
      this.setState({ tabIndex: index })
      socket.emit('closed tab', { fileToClose: file, fileToActive: fileToActive, room: this.props.room, index: index})
    })
    .catch(error => console.error(error.message))
  }

	render() {
    if (this.props.openFiles.length === 0) {
      return (
        <div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.codeIsHappening}
            name="text-editor"
            value={this.state.code}
            width="100%"
            editorProps={{$blockScrolling: true}}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              tabSize: 2,
              fontSize: 16,
              showGutter: true,
              showPrintMargin: false,
              maxLines: Infinity
            }}
          />
          {this.props.role === 'driver' && <form onSubmit={this.onSave}>
            <input type="text" name="filename" placeholder="Name your file" />
            <input type="submit" value="SAVE"/>
          </form>}

        </div>
      )
    } else {
      return (
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={this.state.tabIndex}>
          <TabList>
            {
              this.props.openFiles.length > 0 && this.props.openFiles.map((file, index) => {
                const fileNameArr = file.filePath.split('/')
                const fileName = fileNameArr[fileNameArr.length - 1]
                return (
                  <Tab key={fileName}>{fileName}</Tab>
                )
              })
            }
            <button onClick={this.onAddNewTab}>+</button>
          </TabList>
          {this.props.openFiles.length > 0 && this.props.openFiles.map((file, index) =>
            (<TabPanel key={file.filePath}>
              <button onClick={() => this.onCloseTab(file)}>X</button>
              <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.codeIsHappening}
              name="text-editor"
              value={this.state.code}
              width="100%"
              editorProps={{$blockScrolling: true}}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                tabSize: 2,
                fontSize: 16,
                showGutter: true,
                showPrintMargin: false,
                maxLines: Infinity
              }}
              />
              {(this.props.role === 'driver' && this.props.activeFile.filePath.length > 0) ?
              <button value="SAVE" height="50px" width="70px" type="button" onClick={this.onSave}>SAVE</button>
              :
              <form onSubmit={this.onSave}>
                <input type="text" name="filename" placeholder="Name your file" />
                <input type="submit" value="SAVE"/>
              </form>
              }
              </TabPanel>)
            )}
        </Tabs>
		  )}
	  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorContainer)
