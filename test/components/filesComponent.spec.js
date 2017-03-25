/* eslint-disable no-unused-expressions */

import { spy } from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import FileListComponent from '../../app/components/FileListComponent';

function setup() {
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
    const { li } = setup();
    expect(li.length).toEqual(2)
    expect(li.at(0).text()).toEqual('menu.js')
    expect(li.at(1).text()).toEqual('components')
  });

  it('on file click, fetchActiveFile should be called', () => {
    const { props, li } = setup();
    li.at(0).simulate('click');
    expect(props.fetchActiveFile.called).toBe(true);
  });

  it('on folder click, setVisible should be called', () => {
    const { component, props, li } = setup();
    li.at(1).simulate('click');
    expect(props.setVisibleSpy.called).toBe(true);
    expect(component.state().visible['/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app/components/']).toEqual(true);
  });

});
