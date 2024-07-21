// app/DoctorDetails.js
import React, {useContext, useState} from 'react';
import {View, Text, Pressable, Button, Modal} from 'react-native';
import { layoutStyle, typography, buttons } from '../styles/styles';
import {GlobalContext} from "../context/GlobalContext";
import VideoCall from "../components/VideoCall";

const DoctorDetails = () => {
    const { user, selectedDoctor } = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [targetUserId, setTargetUserId] = useState(null);

    // Handle scenario where doctor may not be available
    if (!selectedDoctor || !user) {
        return (
            <View style={layoutStyle.container}>
                <Text style={typography.header}>Doctor Details</Text>
                <Text style={typography.body}>No doctor information available.</Text>
            </View>
        );
    }

    const handleChatPress = (doctorId) => {

    };
    const handleCallPress = (doctorId) => {
        setTargetUserId(doctorId);
        setModalVisible(true);
    };

    const closeVideoCall = () => {
        setModalVisible(false);
        setTargetUserId(null);
    };

    return (
        <View style={layoutStyle.container}>
            <Text style={typography.header}>{selectedDoctor?.fullName}</Text>
            <Text style={typography.body}>{selectedDoctor?.speciality}</Text>
            <Pressable style={buttons.primary} onPress={() => handleChatPress(selectedDoctor?.id)}>
                <Text style={buttons.primaryText}>Chat</Text>
            </Pressable>

            <Pressable style={buttons.primary} onPress={() => handleCallPress(selectedDoctor?.id)}>
                <Text style={buttons.primaryText}>Call</Text>
            </Pressable>
            <Modal

                transparent={true}
                visible={modalVisible}
                onRequestClose={closeVideoCall}
            >
                <View style={layoutStyle.modalView}>
                    {targetUserId && (
                        <VideoCall
                            targetUserId={targetUserId}
                            closeVideoCall={closeVideoCall}
                        />
                    )}
                    <Button title="Close Call" onPress={closeVideoCall} />
                </View>
            </Modal>
        </View>
    );
};

export default DoctorDetails;
