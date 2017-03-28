// // @flow

import React from 'react'
import Promise from 'bluebird'

import AceEditor from 'react-ace'
import brace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import io from 'socket.io-client'
import { serverLocation } from '../utils/server.settings.js'

const socket = io(serverLocation)

export default class TextEditorComponent extends React.Component {
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
  	socket.emit('room', {room: this.props.room})
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
      console.log(index)
      this.setState({ tabIndex: index })
      socket.emit('closed tab', { fileToClose: file, fileToActive: fileToActive, room: this.props.room, index: index})
    })
    .catch(error => console.error(error.message))
  }

	render() {
    if (this.props.openFiles.length === 0) {
      return (
        <div id="text-editor" className="col-sm-8 text-editor">
          {this.props.role === 'driver' && <form onSubmit={this.onSave}>
            <input type="text" name="filename" placeholder="Name your file" />
            <input type="submit" value="SAVE"/>
          </form>}
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.codeIsHappening}
            name="text-editor"
            value={this.state.code}
            width="100%"
            height="100vh"
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

        </div>
      )
    } else {
      return (
        <div id="text-editor" className="col-sm-8 text-editor">
              <div>
                {(this.props.role === 'driver' && this.props.activeFile.filePath.length > 0) ?
                <div className="admin-btn-container">
                  <div className="admin-btn" onClick={this.onAddNewTab}><i className="fa fa-plus-square-o"/></div>
                  <div className="admin-btn" onClick={() => this.onCloseTab(this.props.activeFile) }><i className="fa fa-times" /></div>
                  <div className="admin-btn" value="SAVE" height="50px" width="70px" type="div" onClick={this.onSave}><i className="fa fa-floppy-o"/></div>
                  <div className="admin-btn" onClick={() => this.props.dispatchOpenGitMenu()}><i className="fa fa-git"/></div>
                </div>
                : (this.props.role === 'driver') ?
                <form onSubmit={this.onSave}>
                  <input type="text" name="filename" placeholder="Name your file" />
                  <input type="submit" value="SAVE"/>
                </form>
                : null
                }
             </div>

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
          </TabList>
          {this.props.openFiles.length > 0 && this.props.openFiles.map((file, index) =>
            (<TabPanel key={file.filePath}>
              <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.codeIsHappening}
              name="text-editor"
              value={this.state.code}
              width="100%"
              height="100vh"
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
              </TabPanel>)
            )}
        </Tabs>
        </div>
		  )}
	  }
  }

