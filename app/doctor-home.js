// app/doctor-home.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import DoctorVideoCall from '../components/DoctorVideoCall';
import { layoutStyle, typography, buttons } from '../styles/styles';
import config from '../config/config';

const DoctorHome = () => {
    const { user } = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [callRequest, setCallRequest] = useState(null);
    const [isInCall, setIsInCall] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Setup WebSocket for doctor to receive call requests
        const newSocket = new WebSocket(`ws://${config.BASE_URL}/ws?userId=${user.id}`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'callRequest') {
                setCallRequest(data);
                setModalVisible(true);
            }
        };

        return () => newSocket.close();
    }, [user]);

    const handleAcceptCall = () => {
        setModalVisible(false);
        setIsInCall(true);

        // Send a message to the patient indicating that the call is accepted
        socket.send(JSON.stringify({
            type: 'callAccepted',
            doctorId: user.id,
            patientId: callRequest.patientId
        }));
    };

    const handleRejectCall = () => {
        setModalVisible(false);
        setCallRequest(null);

        // Send a message to the patient indicating that the call is rejected
        socket.send(JSON.stringify({
            type: 'callRejected',
            doctorId: user.id,
            patientId: callRequest.patientId
        }));
    };

    return (
        <View style={layoutStyle.container}>
            {!isInCall ? (
                <>
                    <Text style={typography.header}>Welcome, {user.fullName}!</Text>
                    <Text style={typography.body}>Waiting for patient calls...</Text>

                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={layoutStyle.modalView}>
                            <Text style={typography.subheader}>Incoming Call</Text>
                            <Text style={typography.body}>{callRequest?.patientName}</Text>
                            <Pressable style={buttons.primary} onPress={handleAcceptCall}>
                                <Text style={buttons.primaryText}>Accept</Text>
                            </Pressable>
                            <Pressable style={buttons.primary} onPress={handleRejectCall}>
                                <Text style={buttons.primaryText}>Reject</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </>
            ) : (
                <DoctorVideoCall callRequest={callRequest} />
            )}
        </View>
    );
};

export default DoctorHome;