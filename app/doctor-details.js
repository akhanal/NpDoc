// app/DoctorDetails.js
import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import { layoutStyle, typography, buttons } from '../styles/styles';
import {GlobalContext} from "../context/GlobalContext";

const DoctorDetails = () => {
    const { user, selectedDoctor } = useContext(GlobalContext);

    // Handle scenario where doctor may not be available
    if (!selectedDoctor) {
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
        </View>
    );
};

export default DoctorDetails;
