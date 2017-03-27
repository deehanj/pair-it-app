/* eslint-disable no-unused-expressions */
import { spy } from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import TextEditorComponent from '../../app/components/TextEditorComponent';

function setup(){
	const propsDriver = {
		role: 'driver',
		activeFile: {filePath:'fileOne', text:'textOne'},
 		openFiles: [{filePath:'fileOne', text:'textOne'}, {filePath:'fileTwo', text:'textTwo'}],
    dir: '/Users/mikeperitz/Fullstack-Immersive/Senior/capstone/app',
		room: 'Christine',
		code: '',
		tabIndex: 0,
    dispatchCloseTab: spy(),
    dispatchUpdateOpenFiles: spy(),
    dispatchSetActiveFileAndReturnFileAndIndex: spy()
	};

const TextEditorDriver = mount(<TextEditorComponent {...propsDriver} />);
  propsDriver.onCloseTab = spy(TextEditorDriver.instance(), 'onCloseTab')
  propsDriver.handleSelect = spy(TextEditorDriver.instance(), 'handleSelect')
  return {
    TextEditorDriver,
    propsDriver,
    Tab: TextEditorDriver.find('Tab'),
    saveBtn: TextEditorDriver.find('[className="save-btn"]'),
    close: TextEditorDriver.find('[className="close-btn"]')
  };
};

  describe('TextEditor component when role is set to driver and files are opened', () => {

    describe('The features it renders', () => {
    	it('should render a button on active Tab to save file', () => {
      		const {saveBtn} = setup();
      		expect(saveBtn.length).toEqual(1);
      	});
      it('should render same number of Tabs as open files', () => {
          const {Tab} = setup();
          expect(Tab.length).toEqual(2);
        });
      it('should render a button on Tab Panel to close the active file', () => {
        const {close} = setup();
        expect(close.length).toEqual(1);
        });

    // describe('The close active file button', () => {
    //   it('should call onClose function', () => {
    //     const {close, propsDriver} = setup();
    //     close.at(0).simulate('click');
    //     expect(propsDriver.onCloseTab.called).toBe(true);
    //   });
    // })

    // describe('Clicking unactive tab', () => {
    //   it('should should call handleSelect', () => {
    //     const {Tab, propsDriver} = setup();
    //     Tab.at(1).simulate('click');
    //     expect(propsDriver.handleSelect.called).toBe(true);
    //   })
    // })
  });


  });
  