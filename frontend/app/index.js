import { useState } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';

import Registrazione from './(components)/(registrazione)/Registrazione'
import Login from './(components)/(login)/Login';

const Home = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    const logIn = (email, password) => {
        if(true){
            setIsLogged(true);
        } // controllo delle credenziali
      
    }

    return (
        <View style={{  backgroundColor: '#f4f4f4' , width: "100%", flex: 1}}>
             <Stack.Screen options={{ headerStyle: { backgroundColor: '#f4f4f4'}, headerShadowVisible: false, headerTitle: ""}}/>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: "100%"}}>
            <Login/>
            </ScrollView>
        </View>
    )
} 

export default Home;
