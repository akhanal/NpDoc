// app/c.js (Screen C)
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function C(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Screen C</Text>
            <Link href="/">Go back to Screen A</Link>
        </View>
    );
}