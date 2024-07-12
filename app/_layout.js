// app/_layout,js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { GlobalProvider } from '../context/GlobalContext';


export default function Layout() {    return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalProvider>

        <Drawer>
            <Drawer.Screen name="index" options={{ title: 'Login' }} />
            <Drawer.Screen name="home"  options={{ title: 'Home' }} />
            <Drawer.Screen name="doctor-details" options={{ title: 'Doctor Details' }} />
        </Drawer>
        </GlobalProvider>
    </GestureHandlerRootView>
    );
};
