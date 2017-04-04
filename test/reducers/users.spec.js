import reducer from '../../app/reducers/UserReducer';
import * as actions from '../../app/actionCreators/UserActionCreators';

const initialState = {
  gitInfo: {},
  unavailable: []
}

const user = {
  gitInfo: {
    login: 'otooleterrence',
    name: 'Terry OToole',
    type: 'User',
    url: 'https://api.github.com/users/otooleterrence'
    }
}


describe('files and text edit reducer', () => {

  it('should handle initial state', () => {
    expect(reducer(initialState, {})).toBe(initialState);
  });

  it('should handle unknown action type', () => {
    expect(reducer(initialState, { type: 'unknown' })).toBe(initialState);
  });

  it('should handle SET_USER', () => {
    expect(reducer(initialState, { type: 'SET_USER', gitInfo: user.gitInfo }).gitInfo).toEqual(user.gitInfo);
  });

  it('should handle REMOVE_USER', () => {
    expect(reducer(initialState, { type: 'REMOVE_USER' }).gitInfo).toEqual({});
  });


});
