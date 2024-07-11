import { StyleSheet } from 'react-native';

// styles/colors.js
export const colors = {
    primary: '#1E90FF',  // Dodger Blue
    secondary: '#4169E1',  // Royal Blue
    background: '#F0F8FF',  // Alice Blue
    text: '#333333',
    white: '#FFFFFF',
};

// styles/typography.js


export const typography = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
    },
    subheader: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
    },
    body: {
        fontSize: 16,
        color: colors.text,
    },
});

export const layoutStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export const buttons = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    primaryText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});