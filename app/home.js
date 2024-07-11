// app/home.js (Screen Home)
import {Link, router} from 'expo-router';
import { View, Text } from 'react-native';
import {useContext, useEffect} from "react";
import {GlobalContext} from "../context/GlobalContext";
import {getStoredValue} from "../utils/storage";

import DoctorList from '../components/DoctorList';
import { layoutStyle, typography } from '../styles/styles';


export default function Home() {
    const { isLoading, setIsLoading, user, setUser } = useContext(GlobalContext);

    // try to load user from storage
    useEffect(() => {
        if(!user) {
            getStoredValue('user').then((res) => {
                console.log('retrieved user');
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
                <Text style={[typography.header, {marginBottom: 10}]}>Welcome!</Text>
                <Text style={[typography.body, {marginBottom: 20}]}>Logged in as: {user.username}</Text>
                <Text style={[typography.subheader, {marginBottom: 20}]}>Doctors List</Text>
                <DoctorList/>
            </View>
        );
    }
    return null;//
}
