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
import { activeFile, updateOpenFiles, addToOpenFiles, closeFile, setFileDir, loadFiles, saveNewFile } from '../reducers/FilesReducer'
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
    dir: state.fileSystem.dir
		// roomName: state.User.username
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchActiveFile: (file) => {
      dispatch(activeFile(file))
      return file
    },
		dispatchUsername: (username) => dispatch(setUser(username)),
		dispatchUpdateOpenFiles: (file) => dispatch(updateOpenFiles(file)),
    dispatchAddToOpenFiles: () => {
      dispatch(addToOpenFiles({ filePath: '', text: '' }))
      dispatch(activeFile({ filePath: '', text: '' }))
    },
		dispatchCloseFile: (file) => dispatch(closeFile(file)),
    setRootDirectory: dir => {
      if (dir.length > 0) {
        getAllFiles(dir + '/')
        .then(result => {
          dispatch(setFileDir(dir))
          dispatch(loadFiles(result))
        })
        .catch(error => console.error(error.message))
      }
    },
    dispatchSaveNewFile: (file) => dispatch(saveNewFile(file))
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

		socket.on('receive code', (payload) => this.updateCodeInState(payload))
		socket.on('changed to new tab', (payload) => {
      this.changeTabFromNavigator(payload.index)
      this.props.dispatchUpdateOpenFiles(payload.file)
    })
    socket.on('added a tab', () => this.props.dispatchAddToOpenFiles())
    socket.on('closed tab', (payload) => this.onCloseTab(payload))

    this.handleSelect = this.handleSelect.bind(this)
    this.codeIsHappening = this.codeIsHappening.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onAddNewTab = this.onAddNewTab.bind(this)
    this.onCloseTab = this.onCloseTab.bind(this)
	}

  componentDidMount() {
  	// this.props.dispatchUsername('Christine')
    // can put a promise here and get rid of the setTimeout
  	setTimeout(() => socket.emit('room', {room: this.props.roomName}), 0)
  }

  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.roomName})
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
    socket.emit('coding event', {code: newCode, room: this.props.roomName})
  }

  updateCodeInState(payload) {
    this.setState({
      code: payload.code,
    })
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last)
    const file = this.props.activeFile
    file.text = this.state.code
    Promise.resolve(this.props.dispatchUpdateOpenFiles(file))
    .then(() => this.props.dispatchActiveFile(this.props.openFiles[index]))
    .then(() => socket.emit('tab changed', {index: index, room: this.props.roomName}))
    .then(() => this.setState({tabIndex: index}))
	  .catch(error => console.error(error.message))
  }

  changeTabFromNavigator(index) {
  	Promise.resolve(this.props.dispatchActiveFile(this.props.openFiles[index]))
    .then(this.setState({tabIndex: index}))
  	.catch(error => console.error(error.message))
  }

//WORKING HERE
// Need to provide a case for user saving a file with no active file open (or do we just want to make the text editor inaccessible until they open a new file?)
// and for a case when the user wants to make a new file

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
    // const filePath = this.props.activeFile.filePath.length > 0 ? this.props.activeFile.filePath : `${this.props.dir}/${ev.target.filename.value}.js`
    writeFile(filePath, this.state.code)
    .then(() => this.props.dispatchUpdateOpenFiles({ filePath, text: this.state.code }))
    .then(() => {
      if (isNewFile) this.props.dispatchSaveNewFile({ filePath, text: this.state.code })
    })
    .then(() => this.props.setRootDirectory(this.props.dir))
    .then(() => socket.emit('save file', { code: this.state.code }))
    .catch(error => console.error('Error writing file: ', error.message))
  }

  onAddNewTab() {
    this.props.dispatchAddToOpenFiles()
    socket.emit('added a tab')
  }

  onCloseTab(file){
    const oldFileIndex = this.props.openFiles.findIndex(openFile => openFile.filePath === file.filePath)
    const length = this.props.openFiles.length - 1
    Promise.resolve(this.props.dispatchCloseFile(file))
    .then(() => {
      if (length === 0) {
        return this.props.dispatchActiveFile({ filePath: '', text: '' })
      } else if (oldFileIndex !== length) {
        return this.props.dispatchActiveFile(this.props.openFiles[oldFileIndex])
      } else if (oldFileIndex === length) {
        return this.props.dispatchActiveFile(this.props.openFiles[length - 1])
      }
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
          <form onSubmit={this.onSave}>
            <input type="text" name="filename" placeholder="Name your file" />
            <input type="submit" value="SAVE"/>
          </form>
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
                  <Tab key={file.filePath}>{fileName}
                    <button onClick={() => {
                        this.onCloseTab(file)
                        socket.emit('closed tab', file)
                      }
                    }>X</button>
                  </Tab>
                )
              })
            }
            <button onClick={this.onAddNewTab}>+</button>
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
              {this.props.activeFile.filePath.length > 0 ?
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
