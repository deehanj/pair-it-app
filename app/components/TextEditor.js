// // @flow

import React from 'react';
import {connect} from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { activeFile } from '../reducers/FilesReducer'

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

import io from 'socket.io-client';

const socket = io('http://pair-server.herokuapp.com');

const mapStateToProps = (state) => {
	return {
		activeFile: state.fileSystem.activeFile,
		openFiles: state.fileSystem.openFiles
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchActiveFile: (file) => {
			dispatch(activeFile(file))
		}
		}
	};

class TextEditorContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			code: '',
			openFiles:[],
			tabIndex: 0,
		}
		socket.on('receive code', (payload) => this.updateCodeInState(payload));
		this.handleSelect = this.handleSelect.bind(this)
	}

  componentDidMount() {
    socket.emit('room', {message: 'joining room' + this.state.room});
  }

  componentWillUnmount() {
    socket.emit('leave room', {message: 'leaving text-editor'})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
    	code: nextProps.activeFile.text, 
    	openFiles: nextProps.openFiles, 
    	tabIndex: nextProps.openFiles.length-1 })
    this.codeIsHappening(nextProps.activeFile.text)
  }

  codeIsHappening(newCode) {
    socket.emit('coding event', {code: newCode})
  }

  updateCodeInState(payload) {
    this.setState({
      code: payload.code,
    });
  }

   handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    this.props.dispatchActiveFile(this.props.openFiles[index])
	setTimeout(() => this.setState({tabIndex: index}), 0) 
  }

	render (){
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

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorContainer);


