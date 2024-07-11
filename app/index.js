// app/index.js (Screen A)
import React, {useContext, useEffect, useState} from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalContext } from './GlobalContext';
import { getValue, setValue } from './storage';

export default function Index() {
    const { isLoading, setIsLoading, user, setUser } = useContext(GlobalContext);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // try to load user from storage
    useEffect(() => {
        getValue('user').then((res) => {
            console.log('retrieved user');
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
        console.log('retrieving user and loading');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#ff0000" />
            </View>
        );
    }

    const handleLogin = () => {
        // Handle login logic here
        // For example, authenticate the user and navigate to the home screen
        if (email === 'test@example.com' && password === 'password') {
            console.log('login successful with email and password');
            const loggedInUser = {username: email, password: password};
            setUser(email);
            setValue('user', email).then(()=>router.push('home'));
        } else {
            alert('Invalid credentials');
        }
    };

    // show login form if loading is done and user does not exist in local storage
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={styles.placeholderText.color}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={styles.placeholderText.color}
                />
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        margin: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: '#3b5998',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    placeholderText: {
        color: '#ccc',
    },
    button: {
        backgroundColor: '#3b5998',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});