import React from 'react'
import io from 'socket.io-client'

import { serverLocation } from '../utils/server.settings.js'
const socket = io(serverLocation)

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      repoId: this.props.repoId,
      clickToGoHome: this.props.clickToGoHome,
      collaborator: this.props.collaborator,
      goToPairRoom: this.props.goToPairRoom,
      myName: this.props.myName
    }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick = () => {
    // console.log('handling click');
    socket.emit('Pair with me', {room: this.state.repoId, name: this.state.collaborator, url: `/${this.state.myName}`})
  }

  render(){
    return (
      <div key={this.state.collaborator} onClick={this.handleClick}>{this.state.collaborator}</div>
    )
  }
}
