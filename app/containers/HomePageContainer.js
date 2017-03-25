// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';

import HomePageComponent from '../components/HomePageComponent';

const mapStateToProps = (state) => {
  return {
    role: 'driver'
  }

}

export default connect(mapStateToProps, null)(HomePageComponent)

