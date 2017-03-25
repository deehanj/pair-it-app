/* eslint-disable no-unused-expressions */
import { spy } from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai'
import TextEditorComponent from '../../app/components/TextEditorComponent';
import { driverSave, setActiveFileAndReturnFileAndIndex, saveNewFile, updateOpenFiles, activeFile } from '../../app/reducers/FilesReducer'



const driverProps ={
	role: 'driver',
	openFiles:[],
	activeFile: {filePath:'filename', text: 'filetext'}
}

const navProps = {
	role: 'navigator',
	openFiles:[]
}

  describe('TextEditor component', () => {
  	it('should render a form for saving files when role is driver', () => {
 		const driverTextEditor = shallow(<TextEditorComponent {...driverProps} />);
  		expect(driverTextEditor.find('form').length).to.equal(1);
  	})
  	it('should not render a form for saving when role is navigator', () => {
  		const navTextEditor = shallow(<TextEditorComponent {...navProps} />);
  		expect(navTextEditor.find('form').length).to.equal(0);
  	})
  	it('should call onSave when save is clicked', () => {
  		const driverTextEditor = shallow(<TextEditorComponent {...driverProps} />);
  		const onSave = spy(driverTextEditor.instance(), 'onSave');
  		driverTextEditor.find('save-btn').simulate('click')
  		expect(onSave).to.have.been.called();
  	})
  })



  