// storage.js
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const getStoredValue = async (key) => {
    let value = null;
    let valueObj = null;

    try{
        if (Platform.OS === 'web') {
            // Use localStorage or sessionStorage for web
            value = window.localStorage.getItem(key);
        } else {
            // Use SecureStore for mobile platforms
            value = await SecureStore.getItemAsync(key);
        }
        valueObj = JSON.parse(value);
    }catch(error) {
        console.error(`Error retrieving value with key ${key}: ${error.message}`);
    }
    return valueObj;
};

export const storeValue = async (key, value) => {
    try {
        if (Platform.OS === 'web') {
            // Use localStorage for web
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            // Use SecureStore for mobile platforms
            await SecureStore.setItemAsync(key, JSON.stringify(value));
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