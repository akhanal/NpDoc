// components/VideoCall.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { GlobalContext } from '../context/GlobalContext';
import { layoutStyle } from '../styles/styles';

const VideoCall = ({ targetUserId, closeVideoCall }) => {
    const { user } = useContext(GlobalContext);
    const isDoctor = user.userType === 'doctor';
    const userId = user.userId;
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const peerConnection = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        startWebSocket();
        startLocalStream();

        return () => {
            closeCall();
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    const startWebSocket = () => {
        socket.current = new WebSocket('ws://localhost:8080/ws?userId=' + userId);

        socket.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'callStarted':
                    handleCallStarted(data.initiatingUser);
                    break;
                case 'callEnded':
                    handleCallEnded();
                    break;
                case 'callOffer':
                    handleCallOffer(data.offer);
                    break;
                case 'answer':
                    handleAnswer(data.answer);
                    break;
                case 'iceCandidate':
                    handleIceCandidate(data.candidate);
                    break;
                default:
                    break;
            }
        };
    };

    const startLocalStream = () => {
        mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(stream => {
            setLocalStream(stream);
        }).catch(error => {
            console.error('Failed to get local stream', error);
        });
    };

    const startCall = () => {
        peerConnection.current = new RTCPeerConnection();
        peerConnection.current.onicecandidate = handleIceCandidateEvent;
        peerConnection.current.ontrack = handleTrackEvent;

        localStream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, localStream);
        });

        peerConnection.current.createOffer().then(offer => {
            return peerConnection.current.setLocalDescription(offer);
        }).then(() => {
            sendCallOffer(peerConnection.current.localDescription);
        }).catch(error => {
            console.error('Failed to start call', error);
        });
    };

    const closeCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setRemoteStream(null);
        sendEndCall();
    };

    const handleCallStarted = (initiatingUser) => {
        console.log('Call started by', initiatingUser);
    };

    const handleCallEnded = () => {
        closeCall();
        closeVideoCall();
    };

    const handleCallOffer = (offer) => {
        peerConnection.current = new RTCPeerConnection();
        peerConnection.current.onicecandidate = handleIceCandidateEvent;
        peerConnection.current.ontrack = handleTrackEvent;

        localStream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, localStream);
        });

        peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
            return peerConnection.current.createAnswer();
        }).then(answer => {
            return peerConnection.current.setLocalDescription(answer);
        }).then(() => {
            sendAnswer(peerConnection.current.localDescription);
        }).catch(error => {
            console.error('Failed to handle call offer', error);
        });
    };

    const handleAnswer = (answer) => {
        peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer)).catch(error => {
            console.error('Failed to handle answer', error);
        });
    };

    const handleIceCandidate = (candidate) => {
        const iceCandidate = new RTCIceCandidate(candidate);
        peerConnection.current.addIceCandidate(iceCandidate).catch(error => {
            console.error('Failed to add ICE candidate', error);
        });
    };

    const handleIceCandidateEvent = (event) => {
        if (event.candidate) {
            sendIceCandidate(event.candidate);
        }
    };

    const handleTrackEvent = (event) => {
        setRemoteStream(event.streams[0]);
    };

    const sendCallOffer = (offer) => {
        const message = {
            type: 'callOffer',
            userId: userId,
            targetUserId: targetUserId,
            offer: offer
        };
        socket.current.send(JSON.stringify(message));
    };

    const sendAnswer = (answer) => {
        const message = {
            type: 'answer',
            userId: userId,
            targetUserId: targetUserId,
            answer: answer
        };
        socket.current.send(JSON.stringify(message));
    };

    const sendIceCandidate = (candidate) => {
        const message = {
            type: 'iceCandidate',
            userId: userId,
            targetUserId: targetUserId,
            candidate: candidate
        };
        socket.current.send(JSON.stringify(message));
    };

    const sendEndCall = () => {
        const message = {
            type: 'endCall',
            userId: userId,
            targetUserId: targetUserId
        };
        socket.current.send(JSON.stringify(message));
    };

    return (
        <View style={layoutStyle.container}>
            <Text>Video Call</Text>
            {localStream && <RTCView streamURL={localStream.toURL()} style={layoutStyle.rtcView} />}
            {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={layoutStyle.rtcView} />}
            {!isDoctor && <Button title="Start Call" onPress={startCall} />}
            <Button title="End Call" onPress={closeCall} />
        </View>
    );
};

export default VideoCall;