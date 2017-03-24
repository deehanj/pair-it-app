'use strict';
const webrtcpak = {};
const events = require('./events');
let peerConnection = null;
let iceCandidates;
let pendingAcceptCandidates;
let canAcceptIce = false;


const error = (err) =>{
  console.log('Error doing things', err);
}

const initiatePC = (onSuccess, MediaStreamURL, socket) => {
    peerConnection = new RTCPeerConnection({
        "iceServers": [{
            "url": "stun:stun.l.google.com:19302"
        }]
    });
    //For debugging purposes
    window.pc = peerConnection;

    iceCandidates = [];
    pendingAcceptCandidates = [];
    const video = document.getElementById('webchatWindow');

    peerConnection.onaddstream = (event) => {
        console.log("onaddstream");
        console.log(event);

        video.src = URL.createObjectURL(event.stream);
        video.play();
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            iceCandidates.push(event.candidate.candidate);
        } else if (peerConnection.iceGatheringState == "complete") {
            console.log("Sending ice candidates to callee");
            for (let i = 0; i < iceCandidates.length; i++) {
                events.trigger('iceCandidate', btoa(iceCandidates[i]));
            }
        }
    };

    onSuccess(MediaStreamURL)
}


//Create a call
webrtcpak.createOffer = (cb, MediaStreamURL, socket) => {
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
                console.log(error)
            });
        },
        MediaStreamURL,
        socket
    );
}

//Receive a call
webrtcpak.receiveOffer = (offerSdp, cb, MediaStreamURL) => {
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
        socket
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
