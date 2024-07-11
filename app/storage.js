// storage.js
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const getValue = async (key) => {
    let value = null;
    if (Platform.OS === 'web') {
        // Use localStorage or sessionStorage for web
        value = window.localStorage.getItem(key);
    } else {
        // Use SecureStore for mobile platforms
        value = await SecureStore.getItemAsync(key);
    }
    return value;
};

export const setValue = async (key, value) => {
    try {
        if (Platform.OS === 'web') {
            // Use localStorage for web
            window.localStorage.setItem(key, value);
        } else {
            // Use SecureStore for mobile platforms
            await SecureStore.setItemAsync(key, value);
        }
        console.log(`Stored ${value} with key ${key}`);
    } catch (error) {
        console.error(`Error storing value with key ${key}: ${error.message}`);
    }
};

export const deleteValue = async (key) => {
    try {
        if (Platform.OS === 'web') {
            // Use localStorage for web
            window.localStorage.removeItem(key);
            console.log(`Deleted value with key ${key}`);
        } else {
            // Use SecureStore for mobile platforms
            await SecureStore.deleteItemAsync(key);
            console.log(`Deleted value with key ${key}`);
        }
    } catch (error) {
        console.error(`Error deleting value with key ${key}: ${error.message}`);
    }
};