'use strict';
const webrtcpak = {};
import events from './events'

let peerConnection = null;
let iceCandidates;
let pendingAcceptCandidates;
let canAcceptIce = false;


const error = (err) =>{
  console.error(err);
}

const initiatePC = (onSuccess, MediaStreamURL, socket, dispatchFunction) => {

    peerConnection = null;
    peerConnection = new RTCPeerConnection({
        "iceServers": [{
            "url": "stun:stun.l.google.com:19302"
        }]
    });
    //For debugging purposes
    window.pc = null;
    window.pc = peerConnection;

    peerConnection.onsignalingstatechange = function(event) {
      console.log(peerConnection.signalingState);
    };

    iceCandidates = [];

    pendingAcceptCandidates = [];

    peerConnection.onaddstream = (event) => {
        dispatchFunction(URL.createObjectURL(event.stream))
    };
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            iceCandidates.push(event.candidate.candidate);
        } else if (peerConnection.iceGatheringState == "complete") {
            for (let i = 0; i < iceCandidates.length; i++) {
                events.trigger('iceCandidate', btoa(iceCandidates[i]));
            }
        }
    };
    onSuccess(MediaStreamURL)
}


//Create a call
webrtcpak.createOffer = (cb, MediaStreamURL, socket, dispatchFunction) => {
    initiatePC(
        (localMediaStream) => {

            peerConnection.addStream(localMediaStream);

            peerConnection.createOffer((offer) => {

                peerConnection.setLocalDescription(
                new RTCSessionDescription(offer),
                () => {
                    cb(btoa(offer.sdp));
                });
            },
            (error) => {
                console.error(error)
            });
        },
        MediaStreamURL,
        socket,
        dispatchFunction
    );
}

//Receive a call
webrtcpak.receiveOffer = (offerSdp, cb, MediaStreamURL, socket, dispatchFunction) => {
    offerSdp = atob(offerSdp);

    initiatePC(

        (localMediaStream) => {
            peerConnection.addStream(localMediaStream);
            peerConnection.setRemoteDescription(
                new RTCSessionDescription(
                    {
                        type: "offer",
                        sdp: offerSdp
                    }
                ),

                () => {
                    peerConnection.createAnswer(
                        (answer) => {
                            console.log(answer)
                            peerConnection.setLocalDescription(answer);
                            canAcceptIce = true;
                            cb(btoa(answer.sdp));
                        },
                        error,
                        {
                            mandatory: {
                                OfferToReceiveAudio: true,
                                OfferToReceiveVideo: true
                            }
                        }
                    );
                },
                error
            );
        },
        MediaStreamURL,
        socket,
        dispatchFunction
    );
}

webrtcpak.receiveAnswer = (answerSdp) => {
    peerConnection.setRemoteDescription(
        new RTCSessionDescription(
            {
                type: "answer",
                sdp: atob(answerSdp)
            }
        )
    );
    canAcceptIce = true;
}

webrtcpak.receiveIceCandidate = (iceCandidate) => {
    if (!canAcceptIce) {
        pendingAcceptCandidates.push(iceCandidate);
        setInterval(mergeCandidates, 100);
    } else {
        addCandidate(iceCandidate);
    }
}

webrtcpak.hangUp = (event) => {
    peerConnection.close();
}

const mergeCandidates = () => {
    if (canAcceptIce) {
        for(let i = 0; i < pendingAcceptCandidates.length; i++){
            addCandidate(pendingAcceptCandidates[i]);
        }
        pendingAcceptCandidates = [];
    } else {
        setInterval(mergeCandidates, 100);
    }
}

const addCandidate = (iceCandidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate({
        candidate: atob(iceCandidate)
    }));
}

export default webrtcpak;

export const pc = peerConnection;
