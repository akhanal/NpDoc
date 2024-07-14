// app/DoctorDetails.js
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { layoutStyle, typography, buttons } from '../styles/styles';

const DoctorDetails = () => {
    const { doctor } = useLocalSearchParams();
    const parsedDoctor = doctor ? JSON.parse(doctor) : null;
    // Handle scenario where doctor may not be available
    if (!parsedDoctor) {
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
            <Text style={typography.header}>{parsedDoctor?.fullName}</Text>
            <Text style={typography.body}>{parsedDoctor?.speciality}</Text>
            <Pressable style={buttons.primary} onPress={() => handleChatPress(parsedDoctor?.id)}>
                <Text style={buttons.primaryText}>Chat</Text>
            </Pressable>

            <Pressable style={buttons.primary} onPress={() => handleCallPress(parsedDoctor?.id)}>
                <Text style={buttons.primaryText}>Call</Text>
            </Pressable>
        </View>
    );
};

export default DoctorDetails;
