// // @flow

import React from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import brace from 'brace'
import AceEditor from 'react-ace'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { activeFile } from '../reducers/FilesReducer'
import { setUser } from '../reducers/UserReducer'
import serverLocation from '../utils/server.settings.js'

import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'


const socket = io(serverLocation)

const mapStateToProps = (state) => {
	return {
		activeFile: state.fileSystem.activeFile,
		openFiles: state.fileSystem.openFiles,
		roomName: state.User.username
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchActiveFile: (file) => dispatch(activeFile(file)),
		dispatchUsername: (username) => dispatch(setUser(username))
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
		socket.on('changed to new tab', (index) => this.changeTabFromNavigator(index))
		this.handleSelect = this.handleSelect.bind(this)
	}

  componentDidMount() {
  	this.props.dispatchUsername('Christine')
    socket.emit('room', {room: this.props.roomName})
  }

  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor' + this.props.roomName})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
    	code: nextProps.activeFile.text, 
    	openFiles: nextProps.openFiles, 
    	tabIndex: nextProps.openFiles.length-1 })
    this.codeIsHappening(nextProps.activeFile.text)
  }

  codeIsHappening(newCode) {
    socket.emit('coding event', {code: newCode, room: this.props.roomName})
  }

  updateCodeInState(payload) {
    this.setState({
      code: payload.code,
    })
  }

   handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last)
    this.props.dispatchActiveFile(this.props.openFiles[index])
    socket.emit('tab changed', {index: index, room: this.props.roomName})
	setTimeout(() => this.setState({tabIndex: index}), 0) 
  }

  changeTabFromNavigator(index) {
  	this.props.dispatchActiveFile(this.props.openFiles[index])
  	setTimeout(() => this.setState({tabIndex: index}), 0)
  }

	render (){
	if (this.state.openFiles.length === 0) {
		return (
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
		)
	} else {
		return (
			<Tabs 
			onSelect={this.handleSelect}
			selectedIndex={this.state.tabIndex}>
				<TabList>
				{this.state.openFiles.length > 0 && this.state.openFiles.map((file, index) =>
					(<Tab key={file.filePath}>{file.filePath}</Tab>)
					)}
				</TabList>
				{this.state.openFiles.length > 0 && this.state.openFiles.map((file, index) =>
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
						<button value="SAVE" height="50px" width="70px" type="button">SAVE</button>
						</TabPanel>)
					)}
			</Tabs>
		)}
	}	
		
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorContainer)


