// styles/styles.js

import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#1E90FF',  // Dodger Blue
    secondary: '#4169E1',  // Royal Blue
    background: '#F0F8FF',  // Alice Blue
    text: '#333333',
    white: '#FFFFFF',
    shadow: '#000000',
};

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
    innerContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 16,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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

export const listStyles = StyleSheet.create({
    list: {
        marginTop: 20,
    },
    listItem: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export const formStyles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: colors.text,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: colors.text,
        backgroundColor: colors.white,
    },
});
