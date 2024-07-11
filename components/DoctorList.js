// components/DoctorList.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors } from '../styles/styles';

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
        <View>
            {doctors.map((doctor) => (
                <View key={doctor.id} style={styles.doctorItem}>
                    <Text style={typography.subheader}>{doctor.name}</Text>
                    <Text style={typography.body}>{doctor.speciality}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    doctorItem: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default DoctorList;