import reducer from '../../app/reducers/FilesReducer';
import * as actions from '../../app/reducers/FilesReducer';

const initialState = {
  dir: '',
  files: [],
  activeFile: {
    filePath: '',
    text: ''
  },
  openFiles: []
}

const file = { filePath: '../fakePath/index.js/', text: 'this is an index.js file' }

describe('files and text edit reducer', () => {

  it('should handle initial state', () => {
    expect(reducer(initialState, {})).toBe(initialState);
  });

  it('should handle unknown action type', () => {
    expect(reducer(initialState, { type: 'unknown' })).toBe(initialState);
  });

  it('should handle SET_FILE_DIR', () => {
    expect(reducer(initialState, { type: 'SET_FILE_DIR', dir: '../fakePath/' }).dir).toBe('../fakePath/');
  });

  it('should handle OPEN_FILES by returning a new openFiles array with the new file', () => {
    expect(reducer(initialState, { type: 'OPEN_FILES', file }).openFiles).toEqual([file]);
  });

  it('should handle CLOSE_FILE by returning a new openFiles array without the file to be closed', () => {
    initialState.openFiles = [file]
    expect(reducer(initialState, { type: 'CLOSE_FILE', file }).openFiles).toEqual([]);
  });

  it('should handle UPDATE_OPEN_FILES by returning a new openFiles array with the updated file', () => {
    initialState.openFiles = [file]
    const updatedFile = { filePath: '../fakePath/index.js/', text: 'some new text' }
    expect(reducer(initialState, { type: 'UPDATE_OPEN_FILES', file: updatedFile }).openFiles).toEqual([updatedFile]);
  });

  it('should handle SAVE_NEW_FILE by returning a new openFiles array, replacing the empty file with the saved file', () => {
    initialState.openFiles = [{ filePath: '', text: '' }]
    expect(reducer(initialState, { type: 'SAVE_NEW_FILE', file }).openFiles).toEqual([file]);
  });

});
