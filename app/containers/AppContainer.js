// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import store from '../store/configureStore.development'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AppContainer extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>  
      </div>
    );
  }
}
