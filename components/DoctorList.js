// components/DoctorList.js
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from 'expo-router'; // Import useNavigation from expo-router
import { typography, listStyles } from '../styles/styles';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigation = useNavigation();

    /*
    useEffect(() => {
        // Simulated API call to fetch doctors
        const mockDoctors = [
            { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
            { id: 2, name: 'Dr. Jane Smith', speciality: 'Pediatrics' },
            { id: 3, name: 'Dr. Mike Johnson', speciality: 'Neurology' },
        ];
        setDoctors(mockDoctors);
    }, []);
    */

    useEffect(() => {
        fetch('http://localhost:8080/api/doctors')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDoctorPress = (doctor) => {
        // Navigate to DoctorDetails screen with doctor data
        navigation.navigate({
            name: 'doctor-details',
            params: { doctor: JSON.stringify(doctor) },
        });
    };

    return (
        <View style={listStyles.list}>
            {doctors.map((doctor) => (
                <Pressable
                    key={doctor.id}
                    style={listStyles.listItem}
                    onPress={() => handleDoctorPress(doctor)}
                >
                    <Text style={typography.subheader}>{doctor.fullName}</Text>
                    <Text style={typography.body}>{doctor.speciality}</Text>
                </Pressable>
            ))}
        </View>
    );
};

export default DoctorList;
