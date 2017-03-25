// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import store from '../store/configureStore.development'

export default class AppContainer extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
