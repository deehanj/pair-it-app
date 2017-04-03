/* eslint-disable no-unused-expressions */

import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import FileListComponent from '../../app/components/FileListComponent';
import FilesComponent from '../../app/components/FilesComponent';

const setup = () => {
  const props = {
    fetchActiveFile: spy(),
    dispatchSetFileDirAndLoadFiles: spy(),
    switchTab: spy(),
    dispatchActiveFile: spy(),
    toggleVisibility: spy(),
    dir: './app',
    openFiles: [],
    isVisible: { ['./fake-file/menu.js/']: true, ['./fake-file/components/']: false },
    files: [
      {
        filePath: './fake-file/menu.js/',
        fileBool: true,
      },
      {
        filePath: './fake-file/components/',
        fileBool: false,
      }
    ]
  };
  const component1 = shallow(<FileListComponent {...props} />);
  const component2 = shallow(<FilesComponent {...props} />);
  // props.setVisibleSpy = spy(component1.instance(), 'setVisible');
  props.selectFileSpy = spy(component2.instance(), 'selectFile');
  props.onSubmitSpy = spy(component2.instance(), 'onSubmit');
  return {
    component1,
    component2,
    props,
    fileListLi: component1.find('li'),
    folderListDiv: component1.find('div'),
    filesInput: component2.find('input'),
    filesButton: component2.find('button')
  };
}

describe('FileListComponent', () => {

  it('should should display the list of files', () => {
    const { fileListLi } = setup();
    expect(fileListLi.length).toEqual(2)
    expect(fileListLi.at(0).text()).toContain('menu.js')
    expect(fileListLi.at(1).text()).toContain('components')
  });

  it('on file click, fetchActiveFile and switchTab should be called if openFiles array does not contain the clicked file', () => {
    const { props, fileListLi } = setup();
    fileListLi.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
    expect(props.switchTab.called).toBe(true);
  });

  it('on file click, dispatchActiveFile should be called if openFiles array does not contain the clicked file', () => {
    const { props, fileListLi } = setup();
    props.openFiles = [props.files[0]]
    fileListLi.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
    expect(props.switchTab.called).toBe(true);
  });

  it('on folder click, toggleVisibility should be called', () => {
    const { component1, props, folderListDiv } = setup();
    folderListDiv.at(0).simulate('click');
    expect(props.toggleVisibility.called).toBe(true);
  });

});

describe('FilesComponent', () => {

  it('should have a file selection input', () => {
    const { filesInput } = setup();
    expect(filesInput.length).toEqual(1)
  });

  it('on file click, fetchActiveFile should be called', () => {
    const { filesButton, props } = setup();
    filesButton.simulate('click');
    expect(props.dispatchSetFileDirAndLoadFiles.called).toBe(true);
  });

});
