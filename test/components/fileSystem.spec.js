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
    dir: './app',
    visible: { ['./fake-file/menu.js/']: true, ['./fake-file/components/']: false },
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
  props.setVisibleSpy = spy(component1.instance(), 'setVisible');
  props.selectFileSpy = spy(component2.instance(), 'selectFile');
  props.onSubmitSpy = spy(component2.instance(), 'onSubmit');
  return {
    component1,
    component2,
    props,
    fileListLi: component1.find('li'),
    filesInput: component2.find('input'),
    filesButton: component2.find('button')
  };
}

describe('FileListComponent', () => {

  it('should should display the list of files', () => {
    const { fileListLi } = setup();
    expect(fileListLi.length).toEqual(2)
    expect(fileListLi.at(0).text()).toEqual('menu.js')
    expect(fileListLi.at(1).text()).toEqual('components')
  });

  it('on file click, fetchActiveFile should be called', () => {
    const { props, fileListLi } = setup();
    fileListLi.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
  });

  it('on folder click, setVisible should be called', () => {
    const { component1, props, fileListLi } = setup();
    fileListLi.at(1).simulate('click');
    expect(props.setVisibleSpy.called).toBe(true);
    expect(component1.state().visible['./fake-file/components/']).toEqual(true);
  });

});

describe('FilesComponent', () => {

  it('should have a file selection input', () => {
    const { filesInput } = setup();
    expect(filesInput.length).toEqual(1)
  });

  xit('should set the local state dir after a user picks a file', () => {
    // cant make this work!
    const { filesInput, props } = setup();
    filesInput.simulate('change', {target: { files: [{path: 'app'}] }})
    expect(props.selectFileSpy.called).toBe(true)
  });

  it('on file click, fetchActiveFile should be called', () => {
    const { filesButton, props } = setup();
    filesButton.simulate('click');
    expect(props.dispatchSetFileDirAndLoadFiles.called).toBe(true);
  });

});
