// utils/getWebRTC.js
import { Platform } from 'react-native';

const getWebRTC = async () => {
    if (Platform.OS === 'web') {
        const {
            RTCView,
            mediaDevices,
            RTCPeerConnection,
            RTCSessionDescription,
            RTCIceCandidate,
        } = await import('react-native-webrtc-web-shim');
        return {
            RTCView,
            mediaDevices,
            RTCPeerConnection,
            RTCSessionDescription,
            RTCIceCandidate,
        };
    } else {
        const {
            RTCView,
            mediaDevices,
            RTCPeerConnection,
            RTCSessionDescription,
            RTCIceCandidate,
        } = await import('react-native-webrtc');
        return {
            RTCView,
            mediaDevices,
            RTCPeerConnection,
            RTCSessionDescription,
            RTCIceCandidate,
        };
    }
};

export default getWebRTC;
