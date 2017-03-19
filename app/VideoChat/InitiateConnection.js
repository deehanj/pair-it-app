'use strict';

var socket, sessionId, userInfo;
var events = require('./events');
var _  = require('lodash');
var webrtcPak = require('./ExchangeFunctions');

const init = () =>{
  console.log('inited')
  //need to get name and id from state
  var playerInfo = { 
  	name : "james", 
  	_id: "thisIsMyUniqueID" 
  };
  var theOtherUser;
  var isCaller = false;

  socket = io.connect('http://pair-server.herokuapp.com');
  console.log(socket);

  //Render user list
  socket.on('refresh_user_list', function(users){
    users = _.compact(users.map(function(user){
      console.log(user._id, playerInfo._id)
      if(user._id != playerInfo._id){
        return user;
      }else{
        playerInfo.id = user.id; //Refresh server generated id
      }
    }));
    events.trigger('users', users);
  });

  //Emit connected
  console.log('User connected', playerInfo)
  socket.emit('user_connected', playerInfo);  

  //Start a call
  events.suscribe('startCall', function(userDestiny){
    console.log('Requested create call', userDestiny, playerInfo);
    theOtherUser = userDestiny;
    webrtcPak.createOffer(function(offer){  

      socket.emit('start_call_with', {
        userDestiny: theOtherUser,
        userCalling: playerInfo,
        offer: offer
      });
    });
  });

  //Receive a call -- only for !isCaller
  socket.on('receiveOffer', function(options){
    theOtherUser = options.caller;
    webrtcPak.receiveOffer(options.offer, function(answer){
      socket.emit('answer', {
        userDestiny: theOtherUser,
        userCalling: playerInfo,
        answer: answer
      });
    });
  });

  //Receive answer -- only for isCaller
  socket.on('answer', function(answer){
    console.log('Receiving answer')
    webrtcPak.receiveAnswer(answer);
  })

  //Send ice candidates -- for all
  events.suscribe('iceCandidate', function(iceCandidate){
    console.log('Sending ice candidate')
    socket.emit('ice_candidate', {
        userDestiny: theOtherUser,
        userCalling: playerInfo,
        candidate: iceCandidate
      });
  });

  //Receive ice candidates
  socket.on('receiveIceCandidate', function(iceCandidate){
    console.log('Received candidate')
    webrtcPak.receiveIceCandidate(iceCandidate);
  });

}

export default init;
