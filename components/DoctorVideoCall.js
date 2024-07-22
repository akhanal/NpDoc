// components/DoctorVideoCall.js
import React, { useState, useEffect, useRef } from 'react';
import {View, Text, Button, Platform} from 'react-native';
import { layoutStyle } from '../styles/styles';
import getWebRTC from '../utils/getWebRTC';
import config from '../config/config';

const DoctorVideoCall = ({ callRequest }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const peerConnection = useRef(null);
    const socket = useRef(null);

    const [RTCView, setRTCView] = useState(null);
    const [mediaDevices, setMediaDevices] = useState(null);
    const [RTCPeerConnection, setRTCPeerConnection] = useState(null);
    const [RTCSessionDescription, setRTCSessionDescription] = useState(null);
    const [RTCIceCandidate, setRTCIceCandidate] = useState(null);

    useEffect(() => {
        const loadWebRTC = async () => {
            const {
                RTCView,
                mediaDevices,
                RTCPeerConnection,
                RTCSessionDescription,
                RTCIceCandidate,
            } = await getWebRTC();

            setRTCView(() => RTCView);
            setMediaDevices(() => mediaDevices);
            setRTCPeerConnection(() => RTCPeerConnection);
            setRTCSessionDescription(() => RTCSessionDescription);
            setRTCIceCandidate(() => RTCIceCandidate);
        };

        loadWebRTC();
    }, []);

    useEffect(() => {
        if (mediaDevices) {
            startWebSocket();
            startLocalStream();
        }
    }, [mediaDevices]);

    const startWebSocket = () => {
        socket.current = new WebSocket(`ws://${config.BASE_URL}/ws?userId=${callRequest.doctorId}`);

        socket.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
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

    const sendAnswer = (answer) => {
        const message = {
            type: 'answer',
            userId: callRequest.doctorId,
            targetUserId: callRequest.patientId,
            answer: answer
        };
        socket.current.send(JSON.stringify(message));
    };

    const sendIceCandidate = (candidate) => {
        const message = {
            type: 'iceCandidate',
            userId: callRequest.doctorId,
            targetUserId: callRequest.patientId,
            candidate: candidate
        };
        socket.current.send(JSON.stringify(message));
    };

    const closeCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setRemoteStream(null);
        sendEndCall();
    };

    const sendEndCall = () => {
        const message = {
            type: 'endCall',
            userId: callRequest.doctorId,
            targetUserId: callRequest.patientId
        };
        socket.current.send(JSON.stringify(message));
    };

    if (!RTCView || !mediaDevices || !RTCPeerConnection || !RTCSessionDescription || !RTCIceCandidate) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={layoutStyle.container}>
            <Text>Doctor Video Call</Text>
            {localStream && <RTCView
                {...(Platform.OS === 'web'
                    ? { stream: localStream }
                    : { stream: localStream.toURL() })}
                style={layoutStyle.rtcView} />}

            {remoteStream && <RTCView
                {...(Platform.OS === 'web'
                    ? { stream: remoteStream }
                    : { stream: remoteStream.toURL() })}
                style={layoutStyle.rtcView} />}

            <Button title="End Call" onPress={closeCall} />
        </View>
    );
};

export default DoctorVideoCall;