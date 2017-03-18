// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { setFileDir, loadFiles } from '../reducers/FilesReducer';
import { getAllFiles } from '../utils/FileSystemFunction'
import store from '../store/configureStore.development'


export default class App extends Component {
  props: {
    children: Children
  };

  componentDidMount(){
    getAllFiles('../puppy-book/')
    .then(result => {
      store.dispatch(setFileDir('../puppy-book/'))
      store.dispatch(loadFiles(result))
    })
    .catch(error => console.error(error.message))
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
