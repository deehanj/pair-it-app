/* eslint-disable no-unused-expressions */

import { spy } from 'sinon';
import * as actions from '../../app/reducers/FilesReducer';

const file = { filePath: './app/index.js', text: 'console.log("Hello world!")' }
const singleFileArr = [file]
const twoFileArr = [file, file]
const threeFileArr = [file, file, file]
const index = 3

describe('FileList actions', () => {

  it('setFileDir should create SET_FILE_DIR action', () => {
    expect(actions.setFileDir(file)).toEqual({ type: 'SET_FILE_DIR', dir: file });
  });

  it('addToOpenFiles should create UPDATE_OPEN_FILES action', () => {
    expect(actions.updateOpenFiles(file)).toEqual({ type: 'UPDATE_OPEN_FILES', file });
  });

});

describe('FileList thunks', () => {

  it('setActiveFileAndReturnFileAndIndex should create activeFile action', () => {
    const fn = actions.setActiveFileAndReturnFileAndIndex(file);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ type: 'FILE_ACTIVE', file })).toBe(true);
  });

  it('setActiveFileAndReturnFileAndIndex should return file and index array if given an index', () => {
    const fn = actions.setActiveFileAndReturnFileAndIndex(file, index);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    const result = fn(dispatch);
    expect(dispatch.calledWith({ type: 'FILE_ACTIVE', file })).toBe(true);
    expect(result).toEqual([file, index])
  });

  it('addToOpenFilesAndSetActive should create both addToOpenFiles and activeFile actions', () => {
    const fn = actions.addToOpenFilesAndSetActive();
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ type: 'OPEN_FILES', file: { filePath: '', text: '' } })).toBe(true);
    expect(dispatch.calledWith({ type: 'FILE_ACTIVE', file: { filePath: '', text: '' } })).toBe(true);
  });

  // difficult to test setFileDirAndLoadFiles & driverSave thunks because they involve the filesystem

  it('closeTab should create closeFile and setActiveFileAndReturnFileAndIndex actions with a blank file if closing the final tab', () => {
    const fn = actions.closeTab(file, singleFileArr);
    const dispatch = spy();
    const toBeDispatched = [{ filePath: '', text: '' }, 0]
    fn(dispatch);
    expect(dispatch.calledWith({ type: 'CLOSE_FILE', file })).toBe(true);
    expect(dispatch.calledWith(toBeDispatched)).toBe(true);
    // this doesnt work!
  });

})
