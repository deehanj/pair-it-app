/* eslint-disable no-unused-expressions */

import { spy } from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import FileListComponent from '../../app/components/FileListComponent';
import FilesComponent from '../../app/components/FilesComponent'

const fileListSetup = () => {
  const props = {
    fetchActiveFile: spy(),
    dir: '/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app',
    visible: { ['/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/menu.js/']: true, ['/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/components/']: false },
    files: [
      {
        filePath: '/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/menu.js/',
        fileBool: true,
      },
      {
        filePath: '/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/components/',
        fileBool: false,
      }
    ]
  };
  const component = mount(<FileListComponent {...props} />);
  props.setVisibleSpy = spy(component.instance(), 'setVisible')
  return {
    component,
    props,
    li: component.find('li'),
  };
}

describe('FileListComponent', () => {

  it('should should display the list of files', () => {
    const { li } = fileListSetup();
    expect(li.length).toEqual(2)
    expect(li.at(0).text()).toEqual('menu.js')
    expect(li.at(1).text()).toEqual('components')
  });

  it('on file click, fetchActiveFile should be called', () => {
    const { props, li } = fileListSetup();
    li.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
  });

  it('on folder click, setVisible should be called', () => {
    const { component, props, li } = fileListSetup();
    li.at(1).simulate('click');
    expect(props.setVisibleSpy.called).toBe(true);
    expect(component.state().visible['/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/components/']).toEqual(true);
  });

});

const filesSetup = () => {

}

describe('FilesComponent', () => {

  xit('should should display the list of files', () => {
    const { li } = filesSetup();
    expect(li.length).toEqual(2)
    expect(li.at(0).text()).toEqual('menu.js')
    expect(li.at(1).text()).toEqual('components')
  });

  xit('on file click, fetchActiveFile should be called', () => {
    const { props, li } = filesSetup();
    li.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
  });

  xit('on folder click, setVisible should be called', () => {
    const { component, props, li } = filesSetup();
    li.at(1).simulate('click');
    expect(props.setVisibleSpy.called).toBe(true);
    expect(component.state().visible['/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/components/']).toEqual(true);
  });

});
