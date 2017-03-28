import webrtcPak from './ExchangeFunctions';
import events from './events';
import _ from 'lodash';

const ConfigureSocket = (socket, playerInfo, MediaStreamURL, dispatchFunction) => {
	let theOtherUser;

	socket.removeAllListeners("refresh_user_list");
	socket.removeAllListeners("hang_up");
	socket.removeAllListeners("receiveOffer");
	socket.removeAllListeners("answer");
	socket.removeAllListeners("receiveIceCandidate");



	socket.on('refresh_user_list', (users) => {
		users = _.compact(users.map((user) => {
			if(user._id != playerInfo._id){
				return user;
			} else {
				playerInfo.id = user.id; //Refresh server generated id
			}
		}));
		events.trigger('users', users);
	});

	//Emit connected
	socket.emit('user_connected', playerInfo);

	//Start a call
	events.subscribe('startCall', (userDestiny) => {
		theOtherUser = userDestiny;
		webrtcPak.createOffer(
			(offer) => {
				socket.emit('start_call_with',
					{
						userDestiny: theOtherUser,
						userCalling: playerInfo,
						offer: offer
					}
				);
			},
			MediaStreamURL,
			socket,
			dispatchFunction
		);
	});

	socket.on('hang_up', () =>{
		webrtcPak.hangUp()
	})

	//Receive a call -- only for !isCaller
	socket.on('receiveOffer', (options) => {
		console.log('ReceiveOffer')
		theOtherUser = options.caller;
		webrtcPak.receiveOffer(
			options.offer,
			(answer) => {
				socket.emit('answer',
					{
					    userDestiny: theOtherUser,
					    userCalling: playerInfo,
					    answer: answer
		  			}
		  		);
			},
			MediaStreamURL,
			socket,
			dispatchFunction
		);
	});

	//Receive answer -- only for isCaller
	socket.on('answer', (answer) => {
		webrtcPak.receiveAnswer(answer);
	})

	//Send ice candidates -- for all
	events.subscribe('iceCandidate',
		(iceCandidate) => {
		socket.emit('ice_candidate',
			{
			    userDestiny: theOtherUser,
			    userCalling: playerInfo,
			    candidate: iceCandidate
	  		}
	  	);
	});

	//Receive ice candidates
	socket.on('receiveIceCandidate', (iceCandidate) => {
		webrtcPak.receiveIceCandidate(iceCandidate);
	});

}

export default ConfigureSocket;
