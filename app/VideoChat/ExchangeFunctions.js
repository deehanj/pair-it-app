'use strict';
var webrtcpak = {};
var events = require('./events');
var peerConnection = null;
var iceCandidates;
var pendingAcceptCandidates;
var canAcceptIce = false;
var error = function(err){
  console.log('Error doing things', err);
}

function initiatePC(onSuccess, MediaStreamURL){
  peerConnection = new RTCPeerConnection({
    "iceServers": [{
        "url": "stun:stun.l.google.com:19302"
    }]
  });
  //For debugging purposes
  window.pc = peerConnection;

  iceCandidates = [];
  pendingAcceptCandidates = [];
  var video = document.getElementById('webchatWindow');
  console.log(video);
 
  peerConnection.onaddstream = function (event) {
    console.log("onaddstream");
    console.log(event);
    video.src = URL.createObjectURL(event.stream);
    video.play();
  };
 
  peerConnection.onicecandidate = function (event) {
    console.log("onicecandidate");
    if (event.candidate) {
      //console.log("candidate saved..." + event.candidate.candidate);
      iceCandidates.push(event.candidate.candidate);
    } else if (peerConnection.iceGatheringState == "complete") {
      console.log("Sending ice candidates to callee");

      for (var i = 0; i < iceCandidates.length; i++) {
        events.trigger('iceCandidate', btoa(iceCandidates[i]));
      }
    }
  };
 
  // navigator.getUserMedia({
  //   video: true,
  //   audio: true
  // },
  // onSuccess,
  // error);
  //try to invoke the onSuccess function with the URL object representing the media stream that is stored on the state
  onSuccess(MediaStreamURL)
}


//Create a call
webrtcpak.createOffer = (cb, MediaStreamURL) => {
  console.log('createOffer')
  initiatePC(
    function (localMediaStream) {
      var type = typeof(localMediaStream); 
      console.log('@@@@',localMediaStream,'@@@', type);
      console.log('success function');
      peerConnection.addStream(localMediaStream);
      peerConnection.createOffer(function (offer) {
        console.log('Success from createOffer')
        peerConnection.setLocalDescription(

          new RTCSessionDescription(offer),

          function () {
            console.log('offer created, sending it');
            cb(btoa(offer.sdp));
          });
     }, function(error){
      console.log(error)
     });
  }, MediaStreamURL);

}

//Receive a call
webrtcpak.receiveOffer = (offerSdp, cb, MediaStreamURL) =>{
  offerSdp = atob(offerSdp);

  initiatePC(
 
    function (localMediaStream) {
      peerConnection.addStream(localMediaStream);
      peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "offer",
        sdp: offerSdp
      }),
 
      function () {

        peerConnection.createAnswer(function (answer) {
          peerConnection.setLocalDescription(answer);
          console.log("Created answer");
          canAcceptIce = true;
          cb(btoa(answer.sdp));
        },
        error, {
          mandatory: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true
          }
        });

      },
      error);
    }, MediaStreamURL);
}

webrtcpak.receiveAnswer =  (answerSdp) => {
  peerConnection.setRemoteDescription(new RTCSessionDescription({
    type: "answer",
    sdp: atob(answerSdp)
  }));
  canAcceptIce = true;
}

webrtcpak.receiveIceCandidate = (iceCandidate) => {
  if(!canAcceptIce){
    pendingAcceptCandidates.push(iceCandidate);
    setInterval(mergeCandidates, 100);
  }else{
    addCandidate(iceCandidate);
  }
}

function mergeCandidates(){
  if(canAcceptIce){
    for(var i = 0; i < pendingAcceptCandidates.length; i++){
      addCandidate(pendingAcceptCandidates[i]);
    }
    pendingAcceptCandidates = [];
  }else{
    setInterval(mergeCandidates, 100);
  }
}

function addCandidate(iceCandidate){
  console.log('adding candidate');
  peerConnection.addIceCandidate(new RTCIceCandidate({
    candidate: atob(iceCandidate)
  }));
}

export default webrtcpak;