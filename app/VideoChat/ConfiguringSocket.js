import webrtcPak from './ExchangeFunctions';
import events from './events';
// import _ from 'lodash';

const ConfigureSocket = (socket, playerInfo, MediaStreamURL) => {
		  var theOtherUser;

		  socket.on('refresh_user_list', function(users){
		    users = _.compact(users.map(function(user){
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
		    }, MediaStreamURL);
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
		    }, MediaStreamURL);
		  });

		  //Receive answer -- only for isCaller
		  socket.on('answer', function(answer){
		    webrtcPak.receiveAnswer(answer);
		  })

		  //Send ice candidates -- for all
		  events.suscribe('iceCandidate', function(iceCandidate){
		    socket.emit('ice_candidate', {
		        userDestiny: theOtherUser,
		        userCalling: playerInfo,
		        candidate: iceCandidate
		      });
		  });

		  //Receive ice candidates
		  socket.on('receiveIceCandidate', function(iceCandidate){
		    webrtcPak.receiveIceCandidate(iceCandidate);
  		});


}

export default ConfigureSocket;

