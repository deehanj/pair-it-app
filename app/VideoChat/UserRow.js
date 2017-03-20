import React from 'react';
import events from './events';

export default class extends React.Component {

  constructor(props){
    super(props);
    // console.log(props)
    this.state = {
      setting: this.props.setting,
      user: this.props.user
    }
    // this.handleClick = this.handleClick.bind(this);
  }

    handleClick(user, MediaStreamURL){
      //was this.props.user
      // var user = this.props.user;
      var MediaStreamURL = this.props.URL;
      events.trigger('startCall', user, MediaStreamURL);
    }

    render() {
      return (
        <div className="user" onClick={()=>this.handleClick(this.state.user, this.props.URL)}>
          {this.props.user.name} 
        </div>
      );
    }

}