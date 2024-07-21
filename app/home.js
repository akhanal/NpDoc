// app/home.js (Home page)
import { router, useNavigation} from 'expo-router';
import {View, Text, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalContext";
import {getStoredValue} from "../utils/storage";
import config from '../config/config';
import { layoutStyle, typography, listStyles, colors } from '../styles/styles';

export default function Home() {
    const { isLoading, setIsLoading, user, setUser, setSelectedDoctor } = useContext(GlobalContext);
    const [doctors, setDoctors] = useState([]);
    const navigation = useNavigation();

    const fetchDoctors = () => {
        fetch(`http://${config.BASE_URL}/api/doctors`)
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error:', error));
    };

    const handleDoctorPress = (doctor) => {
        setSelectedDoctor(doctor);
        // Navigate to DoctorDetails screen with doctor data
        navigation.navigate({
            name: 'doctor-details'
        });
    };

    // try to load user from storage
    useEffect(() => {
        fetchDoctors();
        if(!user) {
            getStoredValue('user').then((res) => {
                console.log('retrieved user from store in home page');
                setUser(res);
                setIsLoading(false);
            });
        }
    }, []);

    // if there is no user in local storage, go to index page that has login form
    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        }
    }, [isLoading, user]);

    if(user && !isLoading) {
        return (
            <View style={layoutStyle.container}>
                <Text style={[typography.header, { marginBottom: 10 }]}>Welcome! {user.fullName}</Text>
                <Text style={[typography.body, { marginBottom: 20 }]}>Logged in as: {user.username}</Text>
                <Text style={[typography.subheader, { marginBottom: 20 }]}>Doctors List</Text>
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
            </View>
        );
    }
    return null;//
}
