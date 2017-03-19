import React from 'react';
import events from './events';

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      setting: this.props.setting
    }
  }


    // getInitialState: function() {
    //   return {setting: this.props.setting};
    // },

    handleClick(ev){
      events.trigger('startCall', this.props.user);
    }

    render() {
      return (
        <div className="user" onClick={this.handleClick}>
          {this.props.user.name} 
        </div>
      );
    }

}