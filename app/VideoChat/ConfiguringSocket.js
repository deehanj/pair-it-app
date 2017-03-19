import webrtcPak from './ExchangeFunctions'

export default ConfigureSocket(socket, playerInfo, MediaStreamURL){
		  var theOtherUser;

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
		      }, MediaStreamURL);
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
		      }, MediaStreamURL);
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