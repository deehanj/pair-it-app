/* eslint-disable no-unused-expressions */
import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import TextEditorComponent from '../../app/components/TextEditorComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

function setup(){
	const props = {
		role: '',
		activeFile: { filePath: '', text: ''},
 		openFiles: [],
    	dir: '/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app',
		room: 'Christine',
		code: '',
		tabIndex: 0
	};

const TextEditorNoRolesNoFiles = shallow(<TextEditorComponent {...props} />);
  return {
    TextEditorNoRolesNoFiles,
    props,
    Tab: TextEditorNoRolesNoFiles.find('Tab'),
    Form: TextEditorNoRolesNoFiles.find('form')
  };
}

  describe('TextEditor component when no roles are defined and no files are opened', () => {
  	it('should not render a form for saving files', () => {
  		const {Form} = setup();
  		expect(Form.length).toEqual(0);
  	});
  	it('should not render any Tabs', () => {
  		const {Tab} = setup();
  		expect(Tab.length).toEqual(0);
  	})
  })



