// app/index.js (Login and default page)
import React, {useContext, useEffect, useState} from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalContext } from '../context/GlobalContext';
import { getStoredValue, storeValue } from '../utils/storage';
import { colors, typography, layoutStyle, buttons, formStyles } from '../styles/styles';

export default function Index() {
    const { isLoading, setIsLoading, user, setUser } = useContext(GlobalContext);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // try to load user from storage
    useEffect(() => {
        getStoredValue('user').then((res) => {
            console.log(`retrieved user from store at index page ${res}`);
            setUser(res);
            setIsLoading(false);
        });

    }, []);

    // if there is user in local storage, go to home page
    useEffect(() => {
        if (!isLoading && user) {
            router.push("/home");
        } else if (!isLoading) {

        }
    }, [isLoading, user]);

    // show loading indicator while loading
    if (isLoading) {
        console.log('loading');
        return (
            <View style={layoutStyle.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const handleLogin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, password: password})
        };

        fetch('http://localhost:8080/api/login', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.email) {
                    console.log('login successful with email and password');
                    const loggedInUser = {
                        id: data.id,
                        username: data.email,
                        fullName: data.fullName,
                        userType: data.userType
                    };
                    setUser(loggedInUser);
                    storeValue('user', loggedInUser).then(()=>router.push('/home'));
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('There was an error logging in. Please try again.');
            });
    };

    // show login form if loading is done and user does not exist in local storage
    return (
        <View style={layoutStyle.container}>
            <View style={layoutStyle.innerContainer}>
                <Text style={[typography.header, { marginBottom: 16 }]}>Login</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="password"
                />
                <Pressable style={buttons.primary} onPress={handleLogin}>
                    <Text style={buttons.primaryText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}