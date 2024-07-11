// app/_layout,js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { GlobalProvider } from './GlobalContext';


export default function Layout() {    return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalProvider>

        <Drawer>
            <Drawer.Screen name="index" options={{ title: 'Login' }} />
            <Drawer.Screen name="home"  options={{ title: 'Home' }} />
            <Drawer.Screen name="c"  options={{ title: 'Screen C' }} />
        </Drawer>
        </GlobalProvider>
    </GestureHandlerRootView>
    );
};
