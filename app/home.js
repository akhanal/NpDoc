// app/home.js (Screen Home)
import {Link, router} from 'expo-router';
import { View, Text } from 'react-native';
import {useContext, useEffect} from "react";
import {GlobalContext} from "./GlobalContext";
import {getStoredValue} from "./storage";

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

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome {user?user.username:''}</Text>
            <Link href="/c">Go to Screen C</Link>
        </View>
    );
}
