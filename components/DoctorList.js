// components/DoctorList.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, listStyles } from '../styles/styles';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        // Replace with actual API call
        const mockDoctors = [
            { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
            { id: 2, name: 'Dr. Jane Smith', speciality: 'Pediatrics' },
            { id: 3, name: 'Dr. Mike Johnson', speciality: 'Neurology' },
            { id: 4, name: 'Dr. Achyut B. Hamal', speciality: 'Hepatology' },
        ];
        setDoctors(mockDoctors);
    };

    return (
        <View style={listStyles.list}>
            {doctors.map((doctor) => (
                <View key={doctor.id} style={listStyles.listItem}>
                    <Text style={typography.subheader}>{doctor.name}</Text>
                    <Text style={typography.body}>{doctor.speciality}</Text>
                </View>
            ))}
        </View>
    );
};

export default DoctorList;